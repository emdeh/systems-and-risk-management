//prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { seedRiskLikelihood } from "./seeds/seedRiskLikelihood";
import { seedRiskConsequence } from "./seeds/seedRiskConsequence";
import { seedRiskLevel } from "./seeds/seedRiskLevel";
import { seedRiskMatrix } from "./seeds/seedRiskMatrix";

const prisma = new PrismaClient();

async function main() {
    await seedRiskLikelihood();
    await seedRiskConsequence();
    await seedRiskLevel();
    await seedRiskMatrix();
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());