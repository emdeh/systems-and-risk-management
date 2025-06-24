// src/app/(risks)/components/filterPicker.tsx
'use client';

import { useState } from 'react';
import type { RiskFilters, FilterKey } from '@/app/(risks)/constants/filters';

interface FilterPickerProps {
  options: RiskFilters;
  values: RiskFilters;
  onChange: (filters: RiskFilters) => void;
}

// Utility to toggle an item in a filter list
const toggleValue = (
  list: string[],
  value: string,
): string[] =>
  list.includes(value) ? list.filter(v => v !== value) : [...list, value];

export default function FilterPicker({
  options,
  values,
  onChange,
}: FilterPickerProps) {
  const [local, setLocal] = useState<RiskFilters>(values);

  const toggle = (key: FilterKey, value: string) => {
    setLocal(prev => ({ ...prev, [key]: toggleValue(prev[key], value) }));
  };

  const apply = () => {
    onChange(local);
  };

  const renderGroup = (
    title: string,
    key: FilterKey,
    opts: string[],
  ) => (
    <div className="mb-3" key={key}>
      <h4 className="font-semibold mb-1">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {opts.map(opt => (
          <label key={opt} className="inline-flex items-center space-x-1">
            <input
              type="checkbox"
              checked={local[key].includes(opt)}
              onChange={() => toggle(key, opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="absolute top-10 right-0 bg-white border p-4 shadow-lg z-10 w-72">
      {renderGroup('Status', 'status', options.status)}
      {renderGroup('Owner', 'owner', options.owner)}
      {renderGroup('Category', 'category', options.category)}
      {renderGroup('Inherent Level', 'inherentRiskLevel', options.inherentRiskLevel)}
      {renderGroup('Residual Level', 'residualRiskLevel', options.residualRiskLevel)}
      <button
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
        onClick={apply}
      >
        Apply
      </button>
    </div>
  );
}
