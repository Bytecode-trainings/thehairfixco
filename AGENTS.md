# The Hair Fix Co. — project context

Read this before making any change. It exists so any AI model or IDE (Google Antigravity, Claude, or anyone else opening this repo) continues in the same direction rather than re-deciding things that are already settled.

## What this is

A marketing/booking website for **The Hair Fix Co.**, a premium non-surgical hair replacement, hair patch, hair system and wig studio in Jubilee Hills, Hyderabad, India. Built by Koushik (Bytecode Trainings & Placements / Vangrove Tech) as client work — this is for an external client's business, not Bytecode's own brand.

Reference/original site the client already runs: `www.thehairfixco.in`. Business facts (do not invent alternatives — reuse these exactly):
- Phone / WhatsApp: **+91 90003 57535**
- Location: Jubilee Hills, Hyderabad, Telangana
- Hours: Wednesday–Monday 10:00 AM–7:00 PM, **closed Tuesday**
- ~20+ years in business, private appointment-only consultations, "Invisible Fusion Technology" is their branded term for how systems are bonded

## Goals, in priority order

1. **Make it effortless for a visitor to understand the offering and book an appointment in as few steps as possible.** WhatsApp (pre-filled message) is the primary conversion path; click-to-call and a short on-page form are secondary. Never add friction (extra required fields, multi-step flows, pop-ups) to the booking path without a clear reason.
2. **Mobile-first.** Most traffic will be mobile, especially once Meta/Google Ads start. Every change should be checked at ~390px width first, desktop second. There's a persistent bottom bar on mobile (Call + WhatsApp) — keep it working and don't bury it.
3. **SEO + GEO (generative-engine optimization), then Meta Ads + Google Ads**, are the next phase after this build. Don't make choices that box that out (see Roadmap below).

## Stack — deliberately static HTML/CSS/JS

This is a **plain static site: `index.html` + `css/styles.css` + `js/script.js`. No framework, no build step, no bundler.** This was an explicit decision by the client owner (Koushik), not a default — do not migrate this to Next.js, React, or any framework unless he explicitly asks for that again. His usual stack elsewhere is Next.js + Supabase + Vercel, but this project is staying static on purpose for simplicity and cost.

The booking form is wired to **Web3Forms** (a free form-relay endpoint, no server required) — see `README.md` for the access-key setup. If you add real backend logic later, prefer the smallest static-compatible option (another form-relay, a single serverless function, etc.) over introducing a framework, unless told otherwise.

## File map

```
index.html        — the entire site, one page, all sections
css/styles.css     — all styles; CSS custom properties in :root define the theme (light + dark, toggle-able)
js/script.js       — theme toggle, mobile menu, copy-phone button, Web3Forms submit handler
images/            — hero/studio/consult photos (free-license stock, see below) + favicon
robots.txt, sitemap.xml — SEO scaffolding, already pointed at thehairfixco.in
README.md          — setup checklist (Web3Forms key, ad pixel IDs, real photos, domain)
```

## Design system

- **Colors**: CSS custom properties in `:root` (dark theme, default) and `:root[data-theme="light"]` — `--bg`, `--surface`, `--text`, `--text-muted`, `--accent` (brass/gold `#CDA25E`), `--accent-2` (deep wine, used sparingly), `--border`. Always pull colors from these tokens, never hardcode a hex value in a new component.
- **Type**: `Fraunces` (serif, display/headings) + `Manrope` (sans, body/UI), loaded from Google Fonts. Headings use `text-wrap: balance`.
- **Tone**: premium, discreet, direct. Not corporate, not hypey. Short sentences over marketing fluff.

## Content rules — do not violate these

These came out of an explicit brand/compliance review of the reference site and apply to any copy added here:

- **No unqualified superlative claims** ("the gold standard", "#1", "best in Hyderabad") without evidence. Ground claims in verifiable facts (years in business, specific services) instead.
- **No fabricated testimonials or fake "real" results.** The "Transformations" section's before/after cards are intentionally placeholders (dashed border, "photo placeholder" label) until the client supplies real client photos *with the client's written consent*. Do not replace them with stock photos presented as real results — that's misleading advertising, not a style choice.
- Stock photography (hero portrait, studio interior, consultation photo) is fine for atmosphere/branding — all sourced from Pexels (free license, commercial use OK) — but never caption a stock photo as if it depicts an actual client or result.
- Avoid exclusionary language like "elite clients" — keep it inviting, not gatekept.
- Any numeric claim ("hundreds of clients", "20+ years") should stay as-is unless the client gives you a more specific, verifiable number.

## Known pending items (see README.md for full detail)

- [ ] Web3Forms `access_key` in `index.html` is still the placeholder `YOUR_WEB3FORMS_ACCESS_KEY` — booking form shows a fallback message until it's set.
- [ ] GA4 / Meta Pixel / Google Ads conversion IDs not yet added — needed before the ads phase.
- [ ] Real before/after client photos not yet supplied — placeholders are intentional, not a bug.
- [ ] Confirm `thehairfixco.in` is the final domain (canonical/OG tags, robots.txt, sitemap.xml all assume it).

## Roadmap (so future changes don't conflict with it)

Next phase is **SEO + GEO**, then **Meta Ads + Google Ads**. Practically, that likely means:
- Splitting some content into dedicated pages (e.g. a hair-patch-for-men page, a wigs-for-women page, a Jubilee Hills/Hyderabad local page) rather than only sections on one URL — better for keyword targeting and ad landing-page relevance. If asked to build these, keep them in the same static HTML/CSS/JS pattern as `index.html` (copy its head boilerplate, reuse `css/styles.css`), not a new stack.
- Server-side conversion tracking (Meta Conversions API, Google Enhanced Conversions) eventually needs *some* backend — cross that bridge with the smallest option that keeps the site static, and flag it to Koushik rather than silently introducing a framework.
- `robots.txt` and `sitemap.xml` already exist — update `sitemap.xml` as new pages are added.

## When in doubt

This file plus `README.md` are the source of truth for this project's decisions. If a request conflicts with something above (e.g. "add a customer testimonial" with no real quote, or "let's switch to Next.js"), flag the conflict to the person instead of just doing it.
