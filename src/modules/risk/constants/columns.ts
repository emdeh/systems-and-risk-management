// src/modules/risk/constants/columns.ts
import type { Risk } from '@/shared/types/risk';

export type RiskColumnKey = keyof Risk;

export interface ColumnDef {
  key: RiskColumnKey;
  label: string;
}

export const riskColumnDefs: ColumnDef[] = [
  { key: 'id',                  label: 'ID' },
  { key: 'title',               label: 'Title' },
  { key: 'system',              label: 'System' },
  { key: 'category',            label: 'Category' },
  { key: 'inherentLikelihood',  label: 'Inherent Likelihood' },
  { key: 'inherentConsequence', label: 'Inherent Consequence' },
  { key: 'inherentRiskLevel',   label: 'Inherent Risk' },
  { key: 'residualLikelihood',  label: 'Residual Likelihood' },
  { key: 'residualConsequence', label: 'Residual Consequence' },
  { key: 'residualRiskLevel',   label: 'Residual Risk' },
  { key: 'riskResponse',        label: 'Response' },
  { key: 'status',              label: 'Status' },
  { key: 'nextReviewDate',      label: 'Next Review' },
  { key: 'riskOwner',           label: 'Owner' },
  { key: 'createdAt',           label: 'Created' },
  { key: 'updatedAt',           label: 'Updated' },
];
