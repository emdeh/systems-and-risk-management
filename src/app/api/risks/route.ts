// src/app/api/risks/route.ts
import { NextResponse } from 'next/server';
import { prisma }       from '@/server/db';
import { riskInclude }  from  '@/shared/prisma/risk.includes';

export async function GET() {
  const risks = await prisma.risk.findMany({
    include:  riskInclude,
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json(risks);
}
