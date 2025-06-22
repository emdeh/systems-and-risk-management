'use client';
import { useState, useEffect, SetStateAction } from 'react';
import ColumnPicker from 'src/app/risks/components/columnPicker'
import RiskTable from 'src/app/risks/components/riskTable'
import { fetchRisks } from '@/lib/api';
import { Risk } from '@/types/risk';

const allColumns = [
  { key: 'title', label: 'Title' },
  { key: 'system', label: 'System' },
  { key: 'category', label: 'Category' },
  { key: 'residualRiskLevel', label: 'Residual Risk' },
  { key: 'status', label: 'Status' },
  { key: 'riskOwner', label: 'Owner' },
];

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allColumns.map(c => c.key)
  );
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchRisks()
      .then(data => setRisks(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Risk Register</h1>
        <div className="relative">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setShowPicker(prev => !prev)}
          >
            ⚙︎ Columns
          </button>
          {showPicker && (
            <ColumnPicker
              columns={allColumns}
              visibleColumns={visibleColumns}
              onChange={(vis: SetStateAction<string[]>) => { setVisibleColumns(vis); setShowPicker(false); }}
            />
          )}
        </div>
      </div>
      <RiskTable risks={risks} visibleColumns={visibleColumns} />
    </div>
  );
}
