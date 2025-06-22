'use client';
import { useState } from 'react';

interface Column { key: string; label: string }
interface ColumnPickerProps {
  columns: Column[];
  visibleColumns: string[];
  onChange: (visible: string[]) => void;
}

export default function ColumnPicker({ columns, visibleColumns, onChange }: ColumnPickerProps) {
  const [localVisible, setLocalVisible] = useState<string[]>(visibleColumns);
  const toggle = (key: string) => {
    setLocalVisible(prev =>
      prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
    );
  };
  const apply = () => onChange(localVisible);

  return (
    <div className="absolute top-10 right-0 bg-white border p-4 shadow-lg z-10">
      <h3 className="font-semibold mb-2">Show Columns</h3>
      <div className="flex flex-col space-y-1">
        {columns.map(col => (
          <label key={col.key} className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localVisible.includes(col.key)}
              onChange={() => toggle(col.key)}
            />
            <span>{col.label}</span>
          </label>
        ))}
      </div>
      <button
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
        onClick={apply}
      >
        Apply
      </button>
    </div>
  );
}
