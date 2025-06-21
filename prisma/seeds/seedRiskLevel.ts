// prisma/seeds/seedRiskLevel.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRiskLevel() {
  await prisma.level.createMany({
    data: [
      { id: 1, name: "Very Low",    numericValue: 1 },
      { id: 2, name: "Low",         numericValue: 2 },
      { id: 3, name: "Medium",      numericValue: 3 },
      { id: 4, name: "High",        numericValue: 4 },
      { id: 5, name: "Very High",   numericValue: 5 },
      { id: 6, name: "Extreme",     numericValue: 6 },
    ],
    skipDuplicates: true,
  });
}
