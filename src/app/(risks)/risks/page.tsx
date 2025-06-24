// src/app/(risks)/risks/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ColumnPicker from '@/app/(risks)/components/columnPicker';
import FilterPicker from '@/app/(risks)/components/filterPicker';
import RiskTable from '@/app/(risks)/components/riskTable';
import { fetchRisks } from '@/shared/lib/fetcher';
import type { Risk } from '@/shared/types/risk';
import { riskColumnDefs, RiskColumnKey } from '@/app/(risks)/constants/columns';
import {
  emptyFilters,
  type RiskFilters,
} from '@/app/(risks)/constants/filters';

const defaultColumns: RiskColumnKey[] = [
  'title',
  'description',
  'inherentLikelihood',
  'inherentConsequence',
  'inherentRiskLevel',
  'residualLikelihood',
  'residualConsequence',
  'residualRiskLevel',
  'riskResponse',
  'status',
]

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<RiskColumnKey[]>(
    // start with every available column
    defaultColumns
  );
  const [filters, setFilters] = useState<RiskFilters>(emptyFilters);
  const [showColumns, setShowColumns] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchRisks()
      .then(data => setRisks(data))
      .catch(console.error);
  }, []);

  const filterOptions: RiskFilters = {
    status: Array.from(new Set(risks.map(r => r.status))).sort(),
    owner: Array.from(new Set(risks.map(r => r.riskOwner))).sort(),
    category: Array.from(new Set(risks.map(r => r.category.name))).sort(),
    inherentRiskLevel: Array.from(
      new Set(risks.map(r => r.inherentRiskLevel.name)),
    ).sort(),
    residualRiskLevel: Array.from(
      new Set(risks.map(r => r.residualRiskLevel?.name).filter(Boolean)),
    ).sort(),
  };

  const filteredRisks = risks.filter(r =>
    (filters.status.length === 0 || filters.status.includes(r.status)) &&
    (filters.owner.length === 0 || filters.owner.includes(r.riskOwner)) &&
    (filters.category.length === 0 || filters.category.includes(r.category.name)) &&
    (filters.inherentRiskLevel.length === 0 ||
      filters.inherentRiskLevel.includes(r.inherentRiskLevel.name)) &&
    (filters.residualRiskLevel.length === 0 ||
      filters.residualRiskLevel.includes(r.residualRiskLevel?.name ?? '')),
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Risk Register</h1>
        <div className="relative">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              setShowFilters(prev => !prev);
              setShowColumns(false);
            }}
          >
            🔍 Filters
          </button>
          <span className="mx-2" aria-hidden="true" />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              setShowColumns(prev => !prev);
              setShowFilters(false);
            }}
          >
            ⚙︎ Columns
          </button>
          <span className="mx-2" aria-hidden="true" />
          <Link href="/risks/new">
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              + New Risk
            </button>
          </Link>
          {showColumns && (
            <ColumnPicker
              columns={riskColumnDefs}
              visibleColumns={visibleColumns}
              onChange={(cols: RiskColumnKey[]) => {
                setVisibleColumns(cols);
                setShowColumns(false);
              }}
            />
          )}
          {showFilters && (
            <FilterPicker
              options={filterOptions}
              values={filters}
              onChange={(f: RiskFilters) => {
                setFilters(f);
                setShowFilters(false);
              }}
            />
          )}
        </div>
      </div>

      <RiskTable risks={filteredRisks} visibleColumns={visibleColumns} />
    </div>
  );
}
