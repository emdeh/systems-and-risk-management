import { NextResponse } from 'next/server';
import { prisma }       from '@/server/db';

export async function GET() {
  const items = await prisma.riskCategory.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(items);
}