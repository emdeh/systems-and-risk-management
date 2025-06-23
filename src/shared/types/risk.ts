// src/shared/types/risk.ts
import type { Prisma } from '@prisma/client';
import { riskInclude } from '@/shared/prisma/risk.includes';

// This Risk type now has `category`, `inherentLikelihood`, etc.
export type Risk = Prisma.RiskGetPayload<{ include: typeof riskInclude }>;
