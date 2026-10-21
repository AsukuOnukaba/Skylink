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

## Current phase

**PH-01 — foundation.** The `/` route is a development placeholder, not the public homepage. Branding (PH-02) and homepage design (PH-03) come next after owner checkpoint CP-B.
