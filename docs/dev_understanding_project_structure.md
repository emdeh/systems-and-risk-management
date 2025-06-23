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
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   └── risks/
│   │   └── api/
│   │       ├── consequences/
│   │       ├── likelihoods/
│   │       ├── risk-categories/
│   │       ├── risk-levels/
│   │       └── risks/
│   ├── jobs/
│   │   └── utils/
│   │       └── ism-controls/
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

 - `(risks)` – feature folder for all risk UI. It contains the shared
  `components/`, `constants/` and the `risks/` pages:
  - `risks/page.tsx` – list view of risks.
  - `risks/new/page.tsx` – form to create a new risk.
- `api/` – serverless API endpoints backing the UI. Routes include `/risks`, `/risk-categories`, `/likelihoods`, `/consequences` and `/risk-levels`.
- `layout.tsx`, `page.tsx`, and `globals.css` – the base layout, home page and global styles.

### `src/jobs/`
Utility scripts run outside the web app. Under `utils/ism-controls/` are scripts to fetch and import ISM control data.


### `src/server/`
Server-side helpers. Currently provides the Prisma database client.

### `src/shared/`
Code shared between client and server.

- `lib/` – generic utilities such as `fetcher.ts` used by the front end.
- `prisma/` – helper objects for Prisma queries (e.g., include definitions).
- `types/` – TypeScript types for database entities and catalogs.

## Server-Side vs UI in the App Router

All server-side route handlers live under `src/app/api/…`. These files use
`next/server` to implement API endpoints (e.g. `src/app/api/risks/route.ts`).

UI pages and their supporting components live inside feature route groups such
as `src/app/(risks)/`. This is where you will find the React components and
constants used by the risk pages. For instance, `src/app/(risks)/components` holds
`columnPicker.tsx` and `riskTable.tsx` while `src/app/api/risks/route.ts` defines
the API consumed by these components.

Networking helpers that can run on either side belong in `src/shared`. The
`src/shared/lib/fetcher.ts` file provides wrapper functions (`fetchRisks`,
`createRisk`, etc.) used by the React pages to call the server routes. Keeping
these utilities under `shared` allows them to be imported from both the UI code
and any other scripts without crossing the app/server boundary.

---

This overview should help new developers navigate the repository and understand where key features live.
