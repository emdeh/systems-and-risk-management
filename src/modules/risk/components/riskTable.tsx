// src/modules/risk/components/riskTable.tsx
'use client';

import type { Risk } from '@/shared/types/risk';
import { riskColumnDefs, RiskColumnKey } from '@/modules/risk/constants/columns';

interface RiskTableProps {
  risks: Risk[];
  visibleColumns: RiskColumnKey[];
}

export default function RiskTable({
  risks,
  visibleColumns,
}: RiskTableProps) {
  // only the ColumnDefs the user wants
  const cols = riskColumnDefs.filter(cd => visibleColumns.includes(cd.key));

  return (
    <table className="min-w-full border-collapse border">
      <thead>
        <tr>
          {cols.map(cd => (
            <th key={cd.key} className="border px-4 py-2 text-left">
              {cd.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {risks.map(risk => (
          <tr key={risk.id} className="border-t">
            {cols.map(cd => {
              // grab the raw value
              const raw = (risk as any)[cd.key];
              let cell: React.ReactNode = '';

              // render objects with a name
              if (raw && typeof raw === 'object' && 'name' in raw) {
                cell = raw.name;
              }
              // render ISO date strings
              else if (typeof raw === 'string' && !isNaN(Date.parse(raw))) {
                cell = new Date(raw).toLocaleDateString();
              }
              // fallback for primitives
              else {
                cell = String(raw ?? '');
              }

              return (
                <td key={cd.key} className="border px-4 py-2">
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
