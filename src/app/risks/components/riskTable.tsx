'use client';
import { Risk } from '@/types/risk';

interface RiskTableProps {
  risks: Risk[];
  visibleColumns: string[];
}

export default function RiskTable({ risks, visibleColumns }: RiskTableProps) {
  return (
    <table className="min-w-full border-collapse border">
      <thead>
        <tr>
          {visibleColumns.includes('title') && (
            <th className="border px-4 py-2 text-left">Title</th>
          )}
          {visibleColumns.includes('system') && (
            <th className="border px-4 py-2 text-left">System</th>
          )}
          {visibleColumns.includes('category') && (
            <th className="border px-4 py-2 text-left">Category</th>
          )}
          {visibleColumns.includes('residualRiskLevel') && (
            <th className="border px-4 py-2 text-left">Residual Risk</th>
          )}
          {visibleColumns.includes('status') && (
            <th className="border px-4 py-2 text-left">Status</th>
          )}
          {visibleColumns.includes('riskOwner') && (
            <th className="border px-4 py-2 text-left">Owner</th>
          )}
        </tr>
      </thead>
      <tbody>
        {risks.map(risk => (
          <tr key={risk.id} className="border-t">
            {visibleColumns.includes('title') && (
              <td className="border px-4 py-2">{risk.title}</td>
            )}
            {visibleColumns.includes('system') && (
              <td className="border px-4 py-2">{risk.system}</td>
            )}
            {visibleColumns.includes('category') && (
              <td className="border px-4 py-2">{risk.category.name}</td>
            )}
            {visibleColumns.includes('residualRiskLevel') && (
              <td className="border px-4 py-2">{risk.residualRiskLevel.name}</td>
            )}
            {visibleColumns.includes('status') && (
              <td className="border px-4 py-2">{risk.status}</td>
            )}
            {visibleColumns.includes('riskOwner') && (
              <td className="border px-4 py-2">{risk.riskOwner}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}