export type FilterKey = 'status' | 'owner' | 'category' | 'inherentRiskLevel' | 'residualRiskLevel';

export interface RiskFilters {
  status: string[];
  owner: string[];
  category: string[];
  inherentRiskLevel: string[];
  residualRiskLevel: string[];
}

export const emptyFilters: RiskFilters = {
  status: [],
  owner: [],
  category: [],
  inherentRiskLevel: [],
  residualRiskLevel: [],
};
