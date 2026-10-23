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

## Image pipeline

```bash
pnpm images:pipeline   # generate local fixture + optimize → public/images + src/data/image-manifest.json
```

Originals live in `media-originals/`. Brand logo originals live in `brand-assets/originals/` (do not run through the photo optimizer as marketing photography). Rights tracking: `src/data/image-rights-log.md`. Owner-authorised DataGram library reuse is recorded there; do not hotlink `CompanyWeb/` or publish Class D / mis-matched subjects.

## Current phase

**Through PH-10 technical SEO.** Public routes are prerendered into `dist/spa` with page-specific HTML. Brand lab `/dev/brand` is development-only. Default builds stay non-indexable until OD-10 + `VITE_ALLOW_INDEXING`. `vercel.json` serves `404.html` with HTTP 404 for unknown paths (no SPA 200 fallback) and keeps `POST /api/enquiry`. Contact forms stay gated by `VITE_ENQUIRY_FORMS_ENABLED`. NAP stays empty until OD-01.
