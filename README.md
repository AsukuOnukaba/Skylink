# Skylink website

Public marketing site for Skylink. This repository is separate from DataGram’s `CompanyWeb/` project.

## Production (as of 18 Nov 2026)

| Item | Status |
| --- | --- |
| Hosting | **Vercel** |
| Public hosts | `https://skylink.ng` (apex) → **`https://www.skylink.ng`** |
| Effective live hostname | **`https://www.skylink.ng`** (HTTP → HTTPS; apex → www) |
| Launch status | **Live for soft owner review — not launch-complete** (`noindex`) |
| Local `main` HEAD documented in Run 3 | `0f024d5` — see `../planning/skylink/12-final-launch-readiness-report.md` |
| Runs 1–2 on live production | **Not verified** — live API still `FUNCTION_INVOCATION_FAILED`; Run 2 security headers not observed live |
| Enquiry forms | **Disabled** |
| Analytics | **Disabled** |
| Indexing / sitemap | **Off** (`noindex`; `/sitemap.xml` 404) |
| OD-10 canonical approval | Owner confirmation still required before SEO activation |

Do **not** treat reachability as launch-complete. Do **not** enable indexing, analytics, or forms without explicit owner authorisation and a verified production deploy.

## Stack (PH-01)

- Vite
- React 18
- TypeScript (`strict`)
- React Router
- Tailwind CSS 3
- pnpm
- Node.js **26.x** on Vercel (`package.json` `engines`, `.nvmrc`, `.node-version`)

Application source lives under `src/`. Production client build output is `dist/spa` for Vercel-compatible static hosting. Serverless enquiry entry: `api/enquiry.ts`.

## Boundaries

- Do **not** edit `../CompanyWeb/` from this project.
- Do not copy DataGram logos, credentials, analytics ids, prices, or marketing copy.
- Contact details in `src/config/site.ts` follow the OD-01 register (`info@skylink.com` until the owner replaces it).

## Scripts

```bash
pnpm install
pnpm dev          # local development server
pnpm typecheck    # strict TypeScript project build
pnpm test         # Vitest
pnpm build        # typecheck + Vite build + SEO prerender/check → dist/spa
pnpm seo:generate # prerender published routes, robots, conditional sitemap, 404.html
pnpm seo:check    # assert prerender artefacts (also runs inside pnpm build)
pnpm preview      # local static preview (HTTP status ≠ Vercel 404 behaviour)
pnpm qa:headers   # validate vercel.json security header policy
pnpm qa:security-serve  # serve dist with vercel.json headers for local CSP checks
```

## Environment

Copy `.env.example` to `.env` and fill Skylink-owned values only. Server enquiry secrets must not use the `VITE_` prefix.

### SEO / indexing (PH-10, OD-10)

| Variable | Role |
| --- | --- |
| `VITE_SITE_URL` | Approved HTTPS origin only (expected production value once OD-10 closes: `https://www.skylink.ng`). |
| `VITE_ALLOW_INDEXING` | Must be `true` for production indexing. Preview stays noindex even if set. |
| `VERCEL_ENV` | Set by Vercel (`production` / `preview`). |

Default builds emit `noindex` HTML, `robots.txt` without a sitemap, and no `sitemap.xml`. Do not set Production indexing flags until OD-10, CP-F, and a verified deploy are recorded (`12-final-launch-readiness-report.md`).

### Analytics (PH-11, OD-13)

Set `VITE_GA_MEASUREMENT_ID` on **Vercel Production** only (Skylink GA4 property). The value is never committed. Local and preview builds leave the tag unloaded unless `SKYLINK_FORCE_ANALYTICS=true` (tests / explicit local debug). SPA page views are sent once per route with `send_page_view: false` — disable GA4 Admin “Page changes based on browser history events” to avoid duplicates. Advertising personalisation and Google Signals stay off in code. No Google Tag Manager.

### Enquiry API (PH-08 / Run 1)

`POST /api/enquiry` — expected statuses after a healthy deploy: **405** (`Allow: POST`), **400**, **503** (unconfigured delivery), **502**, **202** (provider accepted only), **500** (unexpected internal JSON). Forms stay gated by `VITE_ENQUIRY_FORMS_ENABLED` (default off). Detail: `../planning/skylink/10-api-runtime-correction.md`.

### Security headers and operations (PH-13B / Run 2)

`vercel.json` defines CSP (no `unsafe-inline` / `unsafe-eval`), frame/nosniff/referrer/permissions policies, and ACAO `https://www.skylink.ng`. OD-16 Firewall rate limiting requires a **dashboard** rule. Detail: `../planning/skylink/11-security-and-operations-hardening.md`.

## Image pipeline

```bash
pnpm images:pipeline   # generate local fixture + optimize → public/images + src/data/image-manifest.json
```

Originals live in `media-originals/`. Brand logo originals live in `brand-assets/originals/`. Rights tracking: `src/data/image-rights-log.md`.

## Current phase

**Production on Vercel; launch readiness = no-go (18 Nov 2026).** Catalogue includes services, priced products, locations, Nigeria guide, support, installation examples, and gallery. Phone, WhatsApp, and `info@skylink.com` are the published contact channels. Forms off. Analytics off. Indexing off. Remaining blockers: authorised deploy of Run 1+2 fixes, OD-10 confirmation, OD-07/15 delivery, OD-16 WAF, OD-13 analytics decision, Search Console, and CP-F owner go/no-go. Full gate: `../planning/skylink/12-final-launch-readiness-report.md`.
