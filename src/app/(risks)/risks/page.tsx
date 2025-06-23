// src/app/(risks)/risks/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ColumnPicker from '@/modules/risk/components/columnPicker';
import RiskTable from '@/modules/risk/components/riskTable';
import { fetchRisks } from '@/shared/lib/fetcher';
import type { Risk } from '@/shared/types/risk';
import { riskColumnDefs, RiskColumnKey } from '@/modules/risk/constants/columns';

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<RiskColumnKey[]>(
    // start with every available column
    riskColumnDefs.map(c => c.key)
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
          <Link href="/risks/new">
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              + New Risk
            </button>
          </Link>
          {showPicker && (
            <ColumnPicker
              columns={riskColumnDefs}
              visibleColumns={visibleColumns}
              onChange={(cols: RiskColumnKey[]) => {
                setVisibleColumns(cols);
                setShowPicker(false);
              }}
            />
          )}
        </div>
      </div>

      <RiskTable risks={risks} visibleColumns={visibleColumns} />
    </div>
  );
}
