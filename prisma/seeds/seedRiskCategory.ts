// prisma/seeds/seedRiskCategory.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedRiskCategory() {
  // 1. Clear out any existing categories
  await prisma.riskCategory.deleteMany();

  // 2. Insert the canonical set of categories
  await prisma.riskCategory.createMany({
    data: [
      { id: 1, name: 'Business' },
      { id: 2, name: 'Operational' },
      { id: 3, name: 'Financial' },
      { id: 4, name: 'Compliance' },
      { id: 5, name: 'Strategic' },
      { id: 6, name: 'Reputational' },
    ],
  });
}
