import { NextResponse } from 'next/server';
import { prisma }       from '@/server/db';

export async function GET() {
  const items = await prisma.consequence.findMany({ orderBy: { numericValue: 'asc' } });
  return NextResponse.json(items);
}