import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer group">
      <div className="relative w-5 h-5">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="border-2 border-gray-300 rounded w-5 h-5 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors" />
        {checked && (
          <Check className="absolute top-0.5 left-0.5 text-white w-4 h-4" />
        )}
      </div>
      <span className="ml-3 text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}