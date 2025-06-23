// prisma/seeds/seedDummyRisks.ts
import { PrismaClient, ReviewFrequency, RiskResponse, RiskStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedDummyRisks(count = 50) {

  await prisma.risk.deleteMany();  // clear existing risks

  // first, pull in your lookup data so we can reference valid FK IDs
  const [categories, likelihoods, consequences, riskLevels] = await Promise.all([
    prisma.riskCategory.findMany(),
    prisma.likelihood.findMany(),
    prisma.consequence.findMany(),
    prisma.riskLevel.findMany(),
  ]);

  // build an array of random Risk objects
  const data = Array.from({ length: count }).map(() => ({
    title: faker.lorem.words(4),
    description: faker.lorem.sentences(2),
    categoryId:    faker.helpers.arrayElement(categories).id,
    inherentLikelihoodId:   faker.helpers.arrayElement(likelihoods).id,
    inherentConsequenceId:  faker.helpers.arrayElement(consequences).id,
    inherentRiskLevelId:    faker.helpers.arrayElement(riskLevels).id,
    residualLikelihoodId:   faker.helpers.arrayElement(likelihoods).id,
    residualConsequenceId:  faker.helpers.arrayElement(consequences).id,
    residualRiskLevelId:    faker.helpers.arrayElement(riskLevels).id,
    riskResponse:   faker.helpers.arrayElement<RiskResponse>([
      RiskResponse.MITIGATE,
      RiskResponse.ACCEPT,
      RiskResponse.AVOID,
      RiskResponse.TRANSFER,
    ]),
    status:         faker.helpers.arrayElement<RiskStatus>([
      RiskStatus.OPEN,
      RiskStatus.IN_PROGRESS,
      RiskStatus.ACCEPTED,
      RiskStatus.CLOSED,
    ]),
    reviewFrequency: faker.helpers.arrayElement<ReviewFrequency | null>([
      null,
      ReviewFrequency.BI_ANNUAL,
      ReviewFrequency.QUARTERLY,
      ReviewFrequency.MONTHLY,
    ]),
    nextReviewDate: faker.date.soon(),      // within next ~30 days
    lastReviewDate: faker.date.past(),      // any time in the past year
    riskOwner:     faker.internet.email(),
    // createdAt/updatedAt will default to now
  }));

  // insert them in one go
  await prisma.risk.createMany({ data });
  console.log(`Seeded ${count} dummy risks`);
}
