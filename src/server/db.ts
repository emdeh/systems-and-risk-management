// src/server/db.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // prevent multiple instantiations in dev
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ||
  new PrismaClient({
    log: ['query'], // optional: logs every SQL in console
  });

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma;
}
