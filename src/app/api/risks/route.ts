import { NextResponse } from 'next/server';
import { prisma }       from '@/server/db';
import { riskInclude }  from  '@/shared/prisma/risk.includes';

export async function GET() {
  const risks = await prisma.risk.findMany({ include: riskInclude, orderBy:{updatedAt:'desc'} });
  return NextResponse.json(risks);
}

export async function POST(req: Request) {
  const body = await req.json();

  // 1️ Destructure the IDs you got from the client
  const {
    title,
    description,
    categoryId,
    inherentLikelihoodId,
    inherentConsequenceId,
    residualLikelihoodId,
    residualConsequenceId,
    riskResponse,
    riskOwner,
    // omit riskLevelId — we calculate it
  } = body;

  // 2️ Look up the inherentRiskLevelId from your matrix
  const inherentMatrix = await prisma.riskMatrix.findUnique({
    where: {
      likelihoodId_consequenceId: {
        likelihoodId: inherentLikelihoodId,
        consequenceId: inherentConsequenceId,
      }
    }
  });
  if (!inherentMatrix) {
    return NextResponse.json({ error: 'Invalid inherent LxC combination' }, { status: 400 });
  }

  // 3️ Same for residual
  const residualMatrix = await prisma.riskMatrix.findUnique({
    where: {
      likelihoodId_consequenceId: {
        likelihoodId: residualLikelihoodId,
        consequenceId: residualConsequenceId,
      }
    }
  });
  if (!residualMatrix) {
    return NextResponse.json({ error: 'Invalid residual LxC combination' }, { status: 400 });
  }

  // 4️ Create the Risk with computed levels
  const newRisk = await prisma.risk.create({
    data: {
      title,
      description,
      categoryId,
      inherentLikelihoodId,
      inherentConsequenceId,
      inherentRiskLevelId: inherentMatrix.riskLevelId,
      residualLikelihoodId,
      residualConsequenceId,
      residualRiskLevelId: residualMatrix.riskLevelId,
      riskResponse,
      riskOwner,
    },
    include: riskInclude,
  });

  // 5️ Return the fully populated object
  return NextResponse.json(newRisk, { status: 201 });
}
