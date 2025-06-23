// prisma/seeds/seedRiskConsequence.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRiskConsequence() {

  await prisma.consequence.deleteMany();

  await prisma.consequence.createMany({
    data: [
      { id: 1, name: "Insignificant",  numericValue: 1 },
      { id: 2, name: "Moderate",       numericValue: 2 },
      { id: 3, name: "Major",          numericValue: 3 },
      { id: 4, name: "Severe",         numericValue: 4 },
      { id: 5, name: "Catastrophic",   numericValue: 5 },
    ]
  });
}
