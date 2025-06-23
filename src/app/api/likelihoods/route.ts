import { NextResponse } from 'next/server';
import { prisma }       from '@/server/db';

export async function GET() {
  const items = await prisma.likelihood.findMany({ orderBy: { numericValue: 'asc' } });
  return NextResponse.json(items);
}