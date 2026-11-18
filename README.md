# Skylink website

Public marketing site for Skylink. This repository is separate from DataGram’s `CompanyWeb/` project.

## Stack (PH-01)

- Vite
- React 18
- TypeScript (`strict`)
- React Router
- Tailwind CSS 3
- pnpm

Application source lives under `src/` (chosen over DataGram’s `client/` path for a clean new app). Production client build output is `dist/spa` for Vercel-compatible static hosting.

## Boundaries

- Do **not** edit `../CompanyWeb/` from this project.
- Do not copy DataGram logos, credentials, analytics ids, prices, or marketing copy.
- Contact and NAP fields in `src/config/site.ts` are placeholders until OD-01 is approved.

## Scripts

```bash
pnpm install
pnpm dev          # local development server
pnpm typecheck    # strict TypeScript project build
pnpm test         # Vitest
pnpm build        # typecheck + Vite build + SEO prerender/check → dist/spa
pnpm seo:generate # prerender published routes, robots, conditional sitemap, 404.html
pnpm seo:check    # assert prerender artefacts (also runs inside pnpm build)
pnpm preview      # preview the production build (local HTTP status ≠ Vercel)
```

## Environment

Copy `.env.example` to `.env` and fill Skylink-owned values only. Server enquiry secrets (later phase) must not use the `VITE_` prefix.

### SEO / indexing (PH-10, OD-10)

| Variable | Role |
| --- | --- |
| `VITE_SITE_URL` | Approved HTTPS origin only (no path, no localhost, no `*.vercel.app`). Empty until OD-10. |
| `VITE_ALLOW_INDEXING` | Must be `true` for production indexing. Preview stays noindex even if set. |
| `VERCEL_ENV` | Set by Vercel (`production` / `preview`). |
| `SKYLINK_FORCE_PRODUCTION_SEO` | Test-only local override — never use on preview. |

Default builds emit `noindex` HTML, `robots.txt` without a sitemap, and no `sitemap.xml`. Production indexing requires OD-10 + the flags above; misconfiguration fails the build.

### Analytics (PH-11, OD-13)

`VITE_GA_MEASUREMENT_ID` stays empty. The Google tag is not loaded, and no events are sent, unless that variable is a real Skylink measurement id. Local and preview builds do not enable analytics. There is no consent banner because no analytics property is approved. Do not paste a DataGram id or a placeholder.

**Production host exists (`skylink.ng` / `www.skylink.ng`) but launch is not complete.** Indexing stays off until OD-10 + explicit go. Validate SEO changes against live HTTP after each approved deploy; local `pnpm preview` status codes are not Vercel’s. Do not invent Search Console data. After any SEO-flag change, confirm live canonicals, `robots.txt`, sitemap host consistency, and that production is not left on unintended `noindex`.

### Enquiry API (PH-08 corrective, 18 Nov 2026)

`POST /api/enquiry` is implemented in `api/enquiry.ts` with shared Zod validation and fail-closed delivery (`src/shared/processEnquiry.ts`, `enquiryDelivery.ts`). Expected statuses: **405** (non-POST, `Allow: POST`), **400** (validation), **503** (delivery not configured), **502** (provider failure), **202** (provider accepted only), **500** (unexpected internal — JSON, no stack traces).

PH-13A found production returning **`FUNCTION_INVOCATION_FAILED`**. Corrective changes modernize `vercel.json` (no legacy `builds`) and harden the handler. **Forms stay off** (`VITE_ENQUIRY_FORMS_ENABLED` unset/false). Details: `../planning/skylink/10-enquiry-api-corrective.md`. Do not claim the live endpoint is fixed until a separately approved deploy is verified.

## Image pipeline

```bash
pnpm images:pipeline   # generate local fixture + optimize → public/images + src/data/image-manifest.json
```

Originals live in `media-originals/`. Brand logo originals live in `brand-assets/originals/` (do not run through the photo optimizer as marketing photography). Rights tracking: `src/data/image-rights-log.md`. Owner-authorised DataGram library reuse is recorded there; do not hotlink `CompanyWeb/` or publish Class D / mis-matched subjects.

## Current phase

**Live on Vercel for owner review; not launch-complete (18 Nov 2026).** Catalogue includes 21 services, 8 priced products, expanded locations, Nigeria guide, support, installation examples, and gallery. Blog articles are not imported. Phone, WhatsApp, and `info@skylink.com` are the published contact channels. Enquiry forms stay off. Analytics stays off. Default builds stay `noindex`. Enquiry delivery provider (OD-07/OD-15), shared rate limiting (OD-16), indexing activation, and Search Console remain open. Enquiry API code correction is prepared; live `POST /api/enquiry` still needs a separately approved redeploy before it can be called fixed.
