// src/shared/lib/fetcher.ts
import type { Risk } from '@/shared/types/risk';

export async function fetchRisks(): Promise<Risk[]> {
  const res = await fetch('/api/risks');
  if (!res.ok) throw new Error('Failed to fetch risks');
  return res.json();
}
