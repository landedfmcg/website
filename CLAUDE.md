# Landed Website — Project Context & Operating Manual
This file is the full handover for building and managing landedfmcg.com. Read it completely before making changes. It contains the business context, brand rules, site architecture, workflows and backlog.

## 1. What Landed is
Landed is an Australian commercial-education brand for challenger food and beverage founders ($500K-10M revenue) who sell, or want to sell, into supermarkets (Coles, Woolworths, Aldi, Metcash, Costco). It was built by a senior operator with 15+ years on the supplier side of enterprise FMCG. Positioning: "the commercial playbook the enterprise suppliers keep in-house, translated for challenger brands." Signature lines: "A great product doesn't get you a supermarket listing." / "Buyers don't list products. They list businesses." / "Range. Rate of sale. Returns." / "Distribution is vanity. Velocity is survival."

The website's jobs, in priority order: (1) publish the essays for SEO and AI-engine discovery, (2) route visitors to the free Supermarket Readiness Blueprint and $49 Buyer Meeting Toolkit on Stan (https://stan.store/Landed), (3) later: host/present course content, newsletter capture, and paid program pages.

## 2. NON-NEGOTIABLE brand and voice rules
- Colours: navy #0C1A2B, orange #E06A2D, paper #FBFAF6, body text #43505D, muted #56636F, on-navy body #C2CEDA. Orange is accent only: eyebrows, CTAs, the full-stop on key headlines, one highlight per component. Never orange body text on light backgrounds. Never gradients.
- Type: Archivo 700/800 for headlines (tight tracking), Hanken Grotesk 400-600 for body, JetBrains Mono 700 for eyebrows/labels (uppercase, wide letterspacing). Loaded via Google Fonts.
- Voice: premium, sober, practitioner. Short sentences. Real retail vocabulary (NIP, scan rate, trade spend, DIFOT, range review, JBP). NEVER use em dashes (—) or en dashes (–) anywhere in site copy. Never use: game-changer, unlock, supercharge, revolutionary, transformative, journey. Never hype.
- ANONYMITY (critical): the owner is currently employed in the industry and stays unnamed. No personal names anywhere on the site, no employer references, no LinkedIn links, byline is always the brand ("Landed"). Credentials phrased as "fifteen years on the supplier side of enterprise FMCG." Do not add team pages, founder photos, or anything identifying without explicit instruction. WHOIS privacy stays on. Never disparage any retailer or named brand in copy.
- Content sources: the essays and all future course/marketing copy originate in `../Commercial Playbook/` (sibling folder). Especially `14-ARTICLE-SERIES.md` (essay masters), `08-SALES-PAGES.md` (program copy), `15-FREE-COURSE-STRATEGY.md` and `22/23-*.md` (business model context). Check there before writing new copy from scratch.

## 3. Tech decisions (deliberate, keep them)
- Plain static HTML + one CSS file (`css/style.css`). No framework, no build step, no JS beyond what a feature strictly requires. This is a choice: maximum speed, maximum SEO, zero dependencies, owner can read every file. Do not introduce React/Next/Tailwind/site generators without being asked.
- Every page is standalone HTML sharing the same header/nav and footer blocks (copy-paste consistency; if you change nav or footer, change it on ALL pages).
- Essays live in `essays/`, one file per essay, slug-named URLs (kebab-case, keyword-bearing).
- SEO furniture that must stay correct on every change: unique <title> and meta description per page, canonical URL, OG tags, JSON-LD (Organization sitewide, Article on essays), `sitemap.xml`, `robots.txt`, `llms.txt` (the AI-crawler site map; update it when content changes).
- Canonical base URL: https://www.landedfmcg.com (www is canonical; apex redirects to www). All canonicals/sitemap/schema already use this.

## 4. Current state (v1, built July 2026)
Pages: `index.html` (home), `about.html`, `resources.html`, `contact.html`, `essays/index.html` + 6 essays: the-margin-you-keep, your-buyer-is-an-employee, the-meeting-is-the-delivery, yes-if, growing-broke, the-second-product-problem. Plus favicon.svg, robots.txt, sitemap.xml, llms.txt, PUBLISHING-GUIDE.md.
All product CTAs point to https://stan.store/Landed. Newsletter = Stan-only for now (deliberate; Kit/Beehiiv embed is a future task). Contact email hello@landedfmcg.com is a placeholder until email routing exists. Footer YouTube link (@landedfmcg) is a placeholder until the channel exists.
Status: NOT yet deployed. Domain landedfmcg.com has just been purchased.

## 5. Immediate task list (in order)
1. Init a git repo in this folder (if not already) with sensible .gitignore; commit v1 as baseline.
2. Deploy to Netlify (preferred: connect the git repo for auto-deploys; acceptable: `netlify deploy` CLI). Site name suggestion: landedfmcg.
3. Connect the custom domain: www.landedfmcg.com as primary, apex redirecting to www, HTTPS auto. DNS lives wherever the domain was registered (likely Cloudflare; if Cloudflare, set DNS records to Netlify per Netlify's external-DNS instructions, proxy OFF for the Netlify records).
4. Set up Cloudflare Email Routing (or registrar equivalent) so hello@landedfmcg.com forwards to the owner's inbox; confirm the contact page address is then real.
5. Google Search Console: verify the domain (DNS TXT), submit sitemap.xml. Then Bing Webmaster Tools (import from GSC) — Bing feeds several AI answer engines.
6. Post-deploy QA: crawl all pages for 200s, check canonical/OG rendering, run Lighthouse (target 95+ on SEO/perf/accessibility; fix what's found), verify favicon and social share cards.

## 6. Standing workflows
ADD AN ESSAY: duplicate an existing essay file as template → replace title/description/slug/standfirst/body (keep drop-cap on first paragraph, keep the closing Blueprint banner) → add entry to `essays/index.html` (newest first) → add URL to `sitemap.xml` → add line to `llms.txt` → if it's homepage-worthy, rotate the three featured essay cards on `index.html` → commit/deploy. Essay masters usually arrive as markdown from the Commercial Playbook folder or from the owner directly; preserve their wording, apply the voice rules (especially: strip any em dashes).
CHANGE PRICES/LINKS/COPY: edit in place, keep metas in sync, redeploy.
NAV/FOOTER CHANGES: apply to every HTML file; they are duplicated by design.

## 7. Backlog (do when asked, not before)
- Newsletter embed (Kit or Beehiiv) as a section on home + essay footers, replacing Stan-only capture.
- Course pages: free-course hub page linking YouTube lessons (strategy in `../Commercial Playbook/15-FREE-COURSE-STRATEGY.md`); later, paid program pages using copy from `08-SALES-PAGES.md`.
- "The Aisle Brief" archive page if/when the weekly news segment launches.
- OG share image (1200x630, navy, brand mark + headline) — currently no og:image.
- Essay RSS feed (nice-to-have for subscribers and AI crawlers).
- Analytics: if added, use a privacy-light option (Plausible/Fathom or Cloudflare Web Analytics). No Google Analytics unless asked.
- Redirect landed.academy (owned/parked) once a course platform exists.

## 8. Success criteria
Fast (static, no bloat), findable (GSC indexed, essays ranking for problem-language queries like "how to get product into Coles", "supermarket buyer meeting", "trade spend"), quotable by AI engines (clean structure + llms.txt), and always on-brand per section 2. When in doubt on any copy decision: sober beats clever, specific beats broad, and the buyer-side operator voice beats marketing voice.
