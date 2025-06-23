// prisma/seeds/seedRiskLikelihood.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); 

export async function seedRiskLikelihood() {

  await prisma.likelihood.deleteMany();
  
  await prisma.likelihood.createMany({
    data: [
      { id: 1, name: "Rare",           numericValue: 1 },
      { id: 2, name: "Unlikely",       numericValue: 2 },
      { id: 3, name: "Even Chance",    numericValue: 3 },
      { id: 4, name: "Likely",         numericValue: 4 },
      { id: 5, name: "Almost Certain", numericValue: 5 },
    ]
  });
}
