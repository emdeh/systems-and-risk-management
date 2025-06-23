// src/app/(risks)/constants/columns.ts
import type { Risk } from '@/shared/types/risk';

export type RiskColumnKey = keyof Risk;
export interface ColumnDef { key: RiskColumnKey; label: string; }

export const riskColumnDefs: ColumnDef[] = [
  { key: 'id',                  label: 'ID' },
  { key: 'title',               label: 'Title' },
  { key: 'description',         label: 'Description' },
  { key: 'category',            label: 'Category' },
  { key: 'inherentLikelihood',  label: 'Inherent Likelihood' },
  { key: 'inherentConsequence', label: 'Inherent Consequence' },
  { key: 'inherentRiskLevel',   label: 'Inherent Risk Level' },
  { key: 'residualLikelihood',  label: 'Residual Likelihood' },
  { key: 'residualConsequence', label: 'Residual Consequence' },
  { key: 'residualRiskLevel',   label: 'Residual Risk Level' },
  { key: 'riskResponse',        label: 'Response' },
  { key: 'status',              label: 'Status' },
  { key: 'reviewFrequency',     label: 'Review Frequency' },
  { key: 'nextReviewDate',      label: 'Next Review Date' },
  { key: 'lastReviewDate',      label: 'Last Review Date' },
  { key: 'riskOwner',           label: 'Owner' },
  { key: 'createdAt',           label: 'Created At' },
  { key: 'updatedAt',           label: 'Last Updated' },
];
