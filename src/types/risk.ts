
export interface Risk {
  id: number;
  title: string;
  system: string;
  category: { id: number; name: string };
  inherentLikelihood: { id: number; name: string };
  inherentConsequence: { id: number; name: string };
  inherentRiskLevel: { id: number; name: string };
  residualLikelihood: { id: number; name: string };
  residualConsequence: { id: number; name: string };
  residualRiskLevel: { id: number; name: string };
  riskResponse: 'MITIGATE' | 'ACCEPT' | 'AVOID' | 'TRANSFER';
  status: 'OPEN' | 'IN_PROGRESS' | 'ACCEPTED' | 'CLOSED';
  nextReviewDate: string | null;
  riskOwner: string;
}