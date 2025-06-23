# 🗂 Understanding Project Structure

This document provides a high level overview of the folders and files in this repository.

## Project Tree

```
.
├── docs/
├── packages/
│   └── prisma-client/
├── prisma/
│   └── seeds/
├── public/
├── src/
│   ├── app/
│   │   ├── (risks)/
│   │   │   └── risks/
│   │   ├── api/
│   │   │   ├── consequences/
│   │   │   ├── likelihoods/
│   │   │   ├── risk-categories/
│   │   │   ├── risk-levels/
│   │   │   └── risks/
│   ├── jobs/
│   │   └── utils/
│   │       └── ism-controls/
│   ├── modules/
│   │   └── risk/
│   │       ├── components/
│   │       └── constants/
│   ├── server/
│   └── shared/
│       ├── lib/
│       ├── prisma/
│       └── types/
└── ... (config files)
```

## Folder Purpose

### `docs/`
Developer guides such as getting started, seeding and data import.

### `packages/`
Holds publishable packages. Currently contains a placeholder `prisma-client` package.

### `prisma/`
Prisma ORM schema (`schema.prisma`) and seed scripts. The `seeds/` folder contains individual seeding modules used by `prisma/seed.ts`.

### `public/`
Static assets served directly by Next.js.

### `src/app/`
Next.js "app" directory. Pages and API routes live here.

- `(risks)` – a route group for risk‑related pages. It contains:
  - `risks/page.tsx` – list view of risks.
  - `risks/new/page.tsx` – form to create a new risk.
- `api/` – serverless API endpoints backing the UI. Routes include `/risks`, `/risk-categories`, `/likelihoods`, `/consequences` and `/risk-levels`.
- `layout.tsx`, `page.tsx`, and `globals.css` – the base layout, home page and global styles.

### `src/jobs/`
Utility scripts run outside the web app. Under `utils/ism-controls/` are scripts to fetch and import ISM control data.

### `src/modules/`
Reusable UI modules. The `risk` module exposes components (`columnPicker`, `riskTable`) and constants used by the risk pages.

### `src/server/`
Server-side helpers. Currently provides the Prisma database client.

### `src/shared/`
Code shared between client and server.

- `lib/` – generic utilities such as `fetcher.ts` used by the front end.
- `prisma/` – helper objects for Prisma queries (e.g., include definitions).
- `types/` – TypeScript types for database entities and catalogs.

---

This overview should help new developers navigate the repository and understand where key features live.
