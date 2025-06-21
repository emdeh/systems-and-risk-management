// prisma/seeds/seedRiskMatrix.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRiskMatrix() {
  await prisma.riskMatrix.createMany({
    data: [
      // consequenceId: 1 (Insignificant)
      { likelihoodId: 1, consequenceId: 1, riskLevelId: 1 }, // Rare + Insig → Very Low
      { likelihoodId: 2, consequenceId: 1, riskLevelId: 1 }, // Unlikely + Insig → Very Low
      { likelihoodId: 3, consequenceId: 1, riskLevelId: 2 }, // Even Chance + Insig → Low
      { likelihoodId: 4, consequenceId: 1, riskLevelId: 2 }, // Likely + Insig → Low
      { likelihoodId: 5, consequenceId: 1, riskLevelId: 3 }, // Almost Certain + Insig → Medium

      // consequenceId: 2 (Moderate)
      { likelihoodId: 1, consequenceId: 2, riskLevelId: 1 }, // Rare + Moderate → Very Low
      { likelihoodId: 2, consequenceId: 2, riskLevelId: 2 }, // Unlikely + Moderate → Low
      { likelihoodId: 3, consequenceId: 2, riskLevelId: 3 }, // Even Chance + Moderate → Medium
      { likelihoodId: 4, consequenceId: 2, riskLevelId: 4 }, // Likely + Moderate → High
      { likelihoodId: 5, consequenceId: 2, riskLevelId: 5 }, // Almost Certain + Moderate → Very High

      // consequenceId: 3 (Major)
      { likelihoodId: 1, consequenceId: 3, riskLevelId: 2 }, // Rare + Major → Low
      { likelihoodId: 2, consequenceId: 3, riskLevelId: 3 }, // Unlikely + Major → Medium
      { likelihoodId: 3, consequenceId: 3, riskLevelId: 4 }, // Even Chance + Major → High
      { likelihoodId: 4, consequenceId: 3, riskLevelId: 5 }, // Likely + Major → Very High
      { likelihoodId: 5, consequenceId: 3, riskLevelId: 6 }, // Almost Certain + Major → Extreme

      // consequenceId: 4 (Severe)
      { likelihoodId: 1, consequenceId: 4, riskLevelId: 3 }, // Rare + Severe → Medium
      { likelihoodId: 2, consequenceId: 4, riskLevelId: 4 }, // Unlikely + Severe → High
      { likelihoodId: 3, consequenceId: 4, riskLevelId: 5 }, // Even Chance + Severe → Very High
      { likelihoodId: 4, consequenceId: 4, riskLevelId: 6 }, // Likely + Severe → Extreme
      { likelihoodId: 5, consequenceId: 4, riskLevelId: 6 }, // Almost Certain + Severe → Extreme

      // consequenceId: 5 (Catastrophic)
      { likelihoodId: 1, consequenceId: 5, riskLevelId: 3 }, // Rare + Catastrophic → Medium
      { likelihoodId: 2, consequenceId: 5, riskLevelId: 5 }, // Unlikely + Catastrophic → Very High
      { likelihoodId: 3, consequenceId: 5, riskLevelId: 5 }, // Even Chance + Catastrophic → Very High
      { likelihoodId: 4, consequenceId: 5, riskLevelId: 6 }, // Likely + Catastrophic → Extreme
      { likelihoodId: 5, consequenceId: 5, riskLevelId: 6 }, // Almost Certain + Catastrophic → Extreme
    ]
  });
}
