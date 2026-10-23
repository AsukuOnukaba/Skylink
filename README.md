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
pnpm build        # typecheck + production build → dist/spa
pnpm preview      # preview the production build
```

## Environment

Copy `.env.example` to `.env` and fill Skylink-owned values only. Server enquiry secrets (later phase) must not use the `VITE_` prefix.

## Image pipeline

```bash
pnpm images:pipeline   # generate local fixture + optimize → public/images + src/data/image-manifest.json
```

Originals live in `media-originals/`. Brand logo originals live in `brand-assets/originals/` (do not run through the photo optimizer as marketing photography). Rights tracking: `src/data/image-rights-log.md`. Do not copy DataGram assets until rights are cleared.

## Current phase

**Through PH-09 forms (public UI gated).** Public routes include `/`, `/services`, `/services/:slug`, `/products`, `/products/:slug`, `/locations`, `/starlink-installation-:place`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, in-app 404. Brand lab: `/dev/brand`. `POST /api/enquiry` validates and delivers when configured (PH-08). Contact quote/survey/product forms exist but stay hidden unless `VITE_ENQUIRY_FORMS_ENABLED=true` after OD-07/OD-15 delivery is verified. NAP stays empty until OD-01.
