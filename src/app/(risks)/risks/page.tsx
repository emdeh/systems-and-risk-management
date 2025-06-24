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
  type FilterKey,
} from '@/app/(risks)/constants/filters';

const defaultColumns: RiskColumnKey[] = [
  'title',
  'category',
  'inherentRiskLevel',
  'residualRiskLevel',
  'riskResponse',
  'status',
];

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<RiskColumnKey[]>(defaultColumns);
  const [filters, setFilters] = useState<RiskFilters>(emptyFilters);
  const [showColumns, setShowColumns] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchRisks().then(setRisks).catch(console.error);
  }, []);

  // build options for each filterable field
  const filterOpts: RiskFilters = {
    status: Array.from(new Set(risks.map(r => r.status))).sort(),
    owner: Array.from(new Set(risks.map(r => r.riskOwner))).sort(),
    category: Array.from(new Set(risks.map(r => r.category.name))).sort(),
    inherentRiskLevel: Array.from(
      new Set(risks.map(r => r.inherentRiskLevel.name))
    ).sort(),
    residualRiskLevel: Array.from(
      new Set(
        risks
          .map(r => r.residualRiskLevel?.name)
          .filter((name): name is string => name !== undefined)
      )
    ).sort(),
    riskResponse: Array.from(new Set(risks.map(r => r.riskResponse))).sort(),
  };

  // apply all filters
  const filteredRisks = risks.filter(r =>
    (filters.status.length === 0 || filters.status.includes(r.status)) &&
    (filters.owner.length === 0 || filters.owner.includes(r.riskOwner)) &&
    (filters.category.length === 0 || filters.category.includes(r.category.name)) &&
    (filters.inherentRiskLevel.length === 0 ||
      filters.inherentRiskLevel.includes(r.inherentRiskLevel.name)) &&
    (filters.residualRiskLevel.length === 0 ||
      filters.residualRiskLevel.includes(r.residualRiskLevel?.name ?? '')) &&
      (filters.riskResponse.length === 0     || filters.riskResponse.includes(r.riskResponse))
  );

  // summary metrics (same as before)
  const total = filteredRisks.length;
  const byLevel = filteredRisks.reduce((acc, r) => {
    const lvl = r.residualRiskLevel?.name ?? 'Unknown';
    acc[lvl] = (acc[lvl] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // handler to toggle or clear a single-column filter
  const handleFilter = (key: FilterKey, value: string | null) => {
    setFilters(prev => {
      const list = prev[key];
      if (value === null) {
        // clear this column filter
        return { ...prev, [key]: [] };
      }
      // toggle the value
      const next = list.includes(value)
        ? list.filter(v => v !== value)
        : [...list, value];
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Risk Register</h1>
        <div className="relative flex space-x-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              setShowFilters(v => !v);
              setShowColumns(false);
            }}
          >
            🔍 Filters
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              setShowColumns(v => !v);
              setShowFilters(false);
            }}
          >
            ⚙︎ Columns
          </button>
          <Link href="/risks/new">
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              + New Risk
            </button>
          </Link>

          {showColumns && (
            <ColumnPicker
              columns={riskColumnDefs}
              visibleColumns={visibleColumns}
              onChange={cols => {
                setVisibleColumns(cols);
                setShowColumns(false);
              }}
            />
          )}

          {showFilters && (
            <FilterPicker
              options={filterOpts}
              values={filters}
              onChange={f => {
                setFilters(f);
                setShowFilters(false);
              }}
            />
          )}
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <div className="bg-white shadow rounded p-3">
          <div className="text-xs text-gray-500">Total</div>
          <div className="text-lg font-bold text-gray-800">{total}</div>
        </div>
        {Object.entries(byLevel).map(([level, count]) => (
          <div key={level} className="bg-white shadow rounded p-3">
            <div className="text-xs text-gray-500">{level}</div>
            <div className="text-lg font-bold">{count}</div>
          </div>
        ))}
      </div>

      {/* Table with new filter props */}
      <RiskTable
        risks={filteredRisks}
        visibleColumns={visibleColumns}
        filters={filters}
        filterOptions={filterOpts}
        onFilter={handleFilter}
      />
    </div>
  );
}
