# 📥 Import External Data Guide

This guide explains how to import external data sources into the local database. 



## ISM Controls

### 📄 Source File

The import relies on a structured OSCAL-style JSON file at:

```
src/controls.json
```

This file must follow the nested `catalog.groups -> controls` structure.

---

### 🧱 1. Set Up the Database Schema

Run the following to apply Prisma schema migrations to your local database:

```bash
pnpm prisma migrate dev
```

This creates the `dev.db` SQLite file and necessary tables.


---

### 🔄 2. Run the ISM Import Script

Use this command to run the import job:

```bash
pnpm import:ism
```

This script:
- Traverses `controls.json`
- Upserts records into `Guideline`, `Section`, `Topic`, and `Control` tables

It ensures the database reflects the structure and metadata in the JSON.

---

### 🔍 3. Inspect Imported Data

Launch Prisma Studio to view the imported controls:

```bash
npx prisma studio
```

You'll be able to browse by table and verify relationships and metadata.

---

### 🔁 Reset and Re-import (Optional)

To reset the import:

```bash
rm prisma/dev.db
pnpm prisma migrate dev
pnpm import:ism
```

---

### 📌 Notes

- This is a foundational pipeline—additional data sources can follow this pattern.
- Extend the import script to handle other structured formats as needed.
