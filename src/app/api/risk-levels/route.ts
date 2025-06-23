import { NextResponse } from 'next/server';
import { prisma }       from '@/server/db';

export async function GET() {
  const items = await prisma.riskLevel.findMany({ orderBy: { rank: 'asc' } });
  return NextResponse.json(items);
}