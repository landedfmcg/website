#!/usr/bin/env node
/*
 * Landed build step. Runs on every Netlify deploy.
 *
 *  1. Regenerates sitemap.xml from the actual .html files on disk, so the
 *     sitemap can never go stale or miss a page again. Pages that carry a
 *     robots "noindex" meta tag are excluded automatically.
 *  2. Pings IndexNow (Bing / Yandex / others) with the current URL list so
 *     those engines learn about changes immediately. This step is best-effort
 *     and never fails the build.
 *
 * No dependencies: standard library only. Google no longer supports sitemap
 * "ping" (retired 2023), so discovery there relies on the always-fresh
 * sitemap in robots.txt plus periodic GSC reads.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ORIGIN = "https://www.landedfmcg.com";
const INDEXNOW_KEY = "d4412f93112595ec346e2b235d7cdee8";
const ROOT = __dirname;

// Directories to scan for indexable .html pages (relative to repo root).
const SCAN_DIRS = [".", "essays"];

function isNoindex(html) {
  // Matches <meta name="robots" ... content="...noindex...">
  return /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
}

// Map a repo-relative file path to its canonical public URL.
function toUrl(rel) {
  rel = rel.replace(/\\/g, "/");
  if (rel === "index.html") return ORIGIN + "/";
  if (rel.endsWith("/index.html")) return ORIGIN + "/" + rel.slice(0, -"index.html".length);
  return ORIGIN + "/" + rel;
}

// Last commit date for a file (YYYY-MM-DD); falls back to today if git is unavailable.
const TODAY = new Date().toISOString().slice(0, 10);
function lastmod(rel) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${rel}"`, {
      cwd: ROOT, stdio: ["ignore", "pipe", "ignore"],
    }).toString().trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : TODAY;
  } catch {
    return TODAY;
  }
}

// Collect indexable pages.
const pages = [];
for (const dir of SCAN_DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const name of fs.readdirSync(abs)) {
    if (!name.endsWith(".html")) continue;
    const rel = dir === "." ? name : `${dir}/${name}`;
    const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
    if (isNoindex(html)) {
      console.log(`  skip (noindex): ${rel}`);
      continue;
    }
    pages.push({ rel, url: toUrl(rel), lastmod: lastmod(rel) });
  }
}

// Stable order: home first, then the rest alphabetically by URL.
pages.sort((a, b) => (a.url === ORIGIN + "/" ? -1 : b.url === ORIGIN + "/" ? 1 : a.url.localeCompare(b.url)));

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map((p) => `  <url><loc>${p.url}</loc><lastmod>${p.lastmod}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
console.log(`sitemap.xml written with ${pages.length} URLs`);

// IndexNow ping (best-effort, never fatal).
(async () => {
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "www.landedfmcg.com",
        key: INDEXNOW_KEY,
        keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList: pages.map((p) => p.url),
      }),
      signal: AbortSignal.timeout(10000),
    });
    console.log(`IndexNow: HTTP ${res.status}`);
  } catch (e) {
    console.log(`IndexNow: skipped (${e && e.message ? e.message : e})`);
  }
})();
