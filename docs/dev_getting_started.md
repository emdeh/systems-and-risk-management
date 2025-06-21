# 🚀 Getting Started Guide

This guide walks you through setting up the project and running the application locally.

---

## 📦 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/)

---

## 🧰 1. Clone the Repository

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

---

## 📥 2. Install Dependencies

```bash
pnpm install
```

This installs all dependencies (including Prisma CLI and Next.js).

---

## 🧪 3. Run the App in Development Mode

```bash
pnpm dev
```

Visit the app at:

```
http://localhost:3000
```

Your changes will reload automatically during development.

---

## 🧱 4. Set Up the Database Schema and import Data

- Follow the [Schema Seeding Guide](/docs/dev_schema_seeding.md) to seed the database schema.
- Follow the [Import External Data Guide](/docs/dev_import_external_data.md) to import external data.
