// src/shared/lib/fetcher.ts
import type { Risk } from '@/shared/types/risk';
import type { 
  RiskCategory,
  Likelihood,
  Consequence,
  RiskLevel
} from '@/shared/types';


async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchRisks(): Promise<Risk[]> {
  const res = await fetch('/api/risks');
  if (!res.ok) throw new Error('Failed to fetch risks');
  return res.json();
}

export const createRisk = (data: Partial<Omit<Risk, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Risk> =>
  request<Risk>('/api/risks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const fetchRiskCategories = (): Promise<RiskCategory[]> =>
  request<RiskCategory[]>('/api/risk-categories');

export const fetchLikelihoods = (): Promise<Likelihood[]> =>
  request<Likelihood[]>('/api/likelihoods');

export const fetchConsequences = (): Promise<Consequence[]> =>
  request<Consequence[]>('/api/consequences');

export const fetchRiskLevels = (): Promise<RiskLevel[]> =>
  request<RiskLevel[]>('/api/risk-levels');