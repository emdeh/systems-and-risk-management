// src/shared/prisma/includes.ts
import { Prisma } from '@prisma/client';

export const riskInclude = Prisma.validator<Prisma.RiskInclude>()({
  category:              true,
  inherentLikelihood:    true,
  inherentConsequence:   true,
  inherentRiskLevel:     true,
  residualLikelihood:    true,
  residualConsequence:   true,
  residualRiskLevel:     true,
});
