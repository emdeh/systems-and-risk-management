// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { seedRiskLikelihood }  from './seeds/seedRiskLikelihood';
import { seedRiskConsequence } from './seeds/seedRiskConsequence';
import { seedRiskLevel }       from './seeds/seedRiskLevel';
import { seedRiskCategory }    from './seeds/seedRiskCategory';
import { seedRiskMatrix }      from './seeds/seedRiskMatrix';
import { seedDummyRisks }      from './seeds/seedDummyRisks';

const prisma = new PrismaClient();

async function main() {
  // 1. Delete children
  await prisma.riskMatrix.deleteMany();
  await prisma.riskControl.deleteMany();
  await prisma.riskTreatment.deleteMany();
  await prisma.risk.deleteMany();

  // 2. Delete lookups
  await prisma.likelihood.deleteMany();
  await prisma.consequence.deleteMany();
  await prisma.riskLevel.deleteMany();
  await prisma.riskCategory.deleteMany();

  // 3. Seed lookups
  await seedRiskLikelihood();
  await seedRiskConsequence();
  await seedRiskLevel();
  await seedRiskCategory();

  // 4. Now seed the matrix
  await seedRiskMatrix();

  // 5. (Optional) seed dummy risk rows
  await seedDummyRisks(100);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
