# 📚 Schema & Seeding Guide

This guide explains how to manage your Prisma schema and seed static lookup tables. It covers initial setup, reset workflows, and how to update your schema and seeds as your data model evolves.

---

## 🔧 Prerequisites

- **Node.js** (v18+ recommended)  
- **pnpm** (v7+ recommended)  
- **Prisma CLI** installed as a dev dependency  
- A `.env` file with:
  ```ini
  DATABASE_URL="file:./dev.db"
  CONTROLS_JSON_URL=...
  CONTROLS_JSON_PATH=...
  ```
---

## 1. Apply Database Schema Migrations

Whenever you change `prisma/schema.prisma`, run:

```bash
pnpm prisma generate
pnpm prisma migrate dev --name <descriptive_name>
```

- `prisma generate` updates the Prisma Client typings.  
- `prisma migrate dev` creates and applies a new migration SQL file.

---

## 2. Seed Static Lookup Tables

Seed all lookup data in one step:

```bash
pnpm prisma db seed
```

This executes `prisma/seed.ts`, which calls your individual seed modules under `prisma/seeds/` (e.g. `seedLikelihood.ts`, `seedConsequence.ts`, `seedRiskLevel.ts`, `seedRiskMatrix.ts`).

---

## 3. Import OSCAL/ISM Controls (Optional)

If you maintain a separate controls pipeline, run:

```bash
pnpm import:ism
```

This fetches the external JSON and upserts into your `Guideline`, `Section`, `Topic`, and `Control` tables.

See [Import External Data Guide](/docs/dev_import_external_data.md) for more information.

---

## 4. Reset & Reinitialize Database

To start from scratch:

```bash
rm prisma/dev.db
rm -rf prisma/migrations
pnpm prisma migrate dev --name reset_schema
pnpm prisma db seed
pnpm import:ism       # if you want controls imported
```

---

## 5. Updating Your Schema & Seeds

When adding new lookup tables or changing models:

1. **Update** `prisma/schema.prisma` with your new `model` or `enum`.  
2. **Add** a new seed module in `prisma/seeds/`, exporting an async function (e.g. `seedNewLookup()`).  
3. **Import** and **invoke** it in `prisma/seed.ts`.  
4. **Run**:
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev --name add_new_lookup
   pnpm prisma db seed
   ```
5. **Verify** in [Prisma Studio](https://www.prisma.io/studio):
   ```bash
   npx prisma studio
   ```

---

## 6. Best Practices

- **One seed script** (`prisma/seed.ts`) orchestrates all modules.  
- Use `skipDuplicates: true` in each `createMany` to allow safe re-seeding.  
- Keep migrations **descriptive** (e.g. `--name add_risk_matrix`).  
- Commit your migration files to version control.  
- Document any env flags or special workflows.

---

## 📖 Related Documentation

- [Getting Started Guide](./dev_getting_started.md)  
- [Import External Data Guide](./dev_import_external_data.md)  
