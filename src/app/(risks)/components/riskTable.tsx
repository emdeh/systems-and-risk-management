// src/app/(risks)/components/riskTable.tsx
'use client';

import React from 'react';
import type { Risk } from '@/shared/types/risk';
import { riskColumnDefs, RiskColumnKey } from '@/app/(risks)/constants/columns';
import type { RiskFilters, FilterKey } from '@/app/(risks)/constants/filters';
import { Popover } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/20/solid';

interface RiskTableProps {
  risks: Risk[];
  visibleColumns: RiskColumnKey[];
  filters: RiskFilters;
  filterOptions: RiskFilters;
  onFilter: (key: FilterKey, value: string | null) => void;
}

// Only these keys can be filtered
const filterableKeys: FilterKey[] = [
  'status',
  'owner',
  'category',
  'inherentRiskLevel',
  'residualRiskLevel',
  'riskResponse',
];

export default function RiskTable({
  risks,
  visibleColumns,
  filters,
  filterOptions,
  onFilter,
}: RiskTableProps) {
  const cols = riskColumnDefs.filter(cd => visibleColumns.includes(cd.key));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {cols.map(cd => (
              <th
                key={cd.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                <div className="flex items-center space-x-2">
                  <span>{cd.label}</span>
                  
                  {filterableKeys.includes(cd.key as FilterKey) && (
                    <Popover className="relative">
                      <Popover.Button
                        className={`p-1 rounded hover:bg-gray-200 ${
                          filters[cd.key as FilterKey].length ? 'bg-blue-100' : ''
                        }`}
                      >
                        <FunnelIcon className="w-4 h-4 text-gray-600" />
                      </Popover.Button>
                      <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg p-3">
                        {filterOptions[cd.key as FilterKey].map(opt => (
                          <label
                            key={opt}
                            className="flex items-center space-x-2 mb-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={filters[cd.key as FilterKey].includes(opt)}
                              onChange={() => onFilter(cd.key as FilterKey, opt)}
                              className="form-checkbox text-blue-600"
                            />
                            <span className="truncate">{opt}</span>
                          </label>
                        ))}
                        <button
                          type="button"
                          onClick={() => onFilter(cd.key as FilterKey, null)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Clear filter
                        </button>
                      </Popover.Panel>
                    </Popover>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {risks.map(risk => (
            <tr key={risk.id} className="hover:bg-gray-50">
              {cols.map(cd => {
                const raw = (risk as any)[cd.key];
                let cell: React.ReactNode = '';

                if (raw && typeof raw === 'object' && 'name' in raw) {
                  cell = (raw as { name: string }).name;
                } else if (typeof raw === 'string' && !isNaN(Date.parse(raw))) {
                  cell = new Date(raw).toLocaleDateString();
                } else {
                  cell = String(raw ?? '');
                }

                return (
                  <td
                    key={cd.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
