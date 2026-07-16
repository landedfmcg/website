# Landed Website: Publishing Guide

## Preview it right now
Open the Website folder and double-click index.html. It opens in your browser and works fully offline. Click around; every page and essay is live locally.

## Going live (15 minutes, free hosting)
1. Register the domain (see recommendations below), ~$15-25/year at VentraIP, Namecheap or Cloudflare.
2. Create a free account at netlify.com.
3. Netlify dashboard > "Add new site" > "Deploy manually" > drag the entire Website folder onto the page. The site is live on a netlify.app address within seconds.
4. Site settings > Domain management > add your custom domain and follow the two DNS steps it shows you (you paste two records at your domain registrar). HTTPS is automatic.
5. Tell me the final domain and I will do a one-pass find-and-replace of the placeholder (www.landedfmcg.com) across the canonical tags, sitemap, robots and schema, and hand the folder back for one re-drag.

## Domain recommendations (check availability in this order)
1. landed.au — short, premium, Australian. If available, take it immediately.
2. getlanded.com.au — verb-led, memorable, likely available.
3. landedfmcg.com — matches the Instagram and YouTube handles exactly (the site is currently built around this as placeholder).
Avoid hyphens and avoid .net/.co; one clean domain plus the .com.au variant redirecting to it is the ideal end state.

## After it's live: the two SEO tasks
1. Google Search Console (search.google.com/search-console): add the domain, verify via the DNS record Netlify shows you, submit sitemap.xml. This is how Google finds the essays; takes 10 minutes and matters more than anything else on this list.
2. Bing Webmaster Tools (imports from Search Console in two clicks). Bing feeds several AI answer engines, and the site already ships an llms.txt file that gives AI services a clean map of what Landed is.

## Adding a new essay (the workflow)
The intended flow: you write or dictate the essay (or ask me to draft it), then tell me to publish it. I generate the new essay page in the site template, add it to the essays index, the sitemap and llms.txt, and you re-drag the folder to Netlify. Total effort on your side: one message and one drag.
If you ever want to do it by hand: copy any essay HTML file, replace the title, description, slug and paragraphs, and add one entry to essays/index.html and sitemap.xml. The structure is deliberately simple enough to edit in Notepad.

## Updating anything else
Every page is a single readable HTML file. Prices, links, new resource cards, wording: tell me the change and I regenerate the file, or edit the text directly; nothing is compiled or hidden.

## What's wired where
- All product/download buttons point to https://stan.store/Landed (one link; update in bulk when Stan tabs/deep links are worth splitting).
- Contact email is hello@landedfmcg.com as a placeholder. Set this up as a free forward at your domain registrar (or Cloudflare email routing) once the domain exists, or tell me to swap it.
- The YouTube footer link assumes @landedfmcg; it's a placeholder until the channel exists.
- Newsletter: per your call, subscribe CTAs go to the Stan Blueprint for now. When you adopt Kit/Beehiiv later, I'll add an embedded form section to the home page and essays in one pass.

## SEO already built in
Semantic HTML, unique titles and meta descriptions per page, canonical URLs, Open Graph tags, Organization and Article structured data (JSON-LD), sitemap.xml, robots.txt, llms.txt for AI crawlers, fast static pages with no trackers or bloat, and keyword-bearing essay URLs. The rankings themselves come from time plus new essays; the plumbing is done.
