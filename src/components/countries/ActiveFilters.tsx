import React from 'react';
import { X } from 'lucide-react';
import { useFilterStore } from '../../store/filterStore';

export function ActiveFilters() {
  const { filters, removeFilter, clearFilters } = useFilterStore();

  const hasActiveFilters = Object.values(filters).some((filter) => 
    Array.isArray(filter) ? filter.length > 0 : !!filter
  );

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Active Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.continents.map((continent) => (
          <FilterTag
            key={continent}
            label={continent}
            onRemove={() => removeFilter('continents', continent)}
          />
        ))}
        {filters.visaTypes.map((type) => (
          <FilterTag
            key={type}
            label={type}
            onRemove={() => removeFilter('visaTypes', type)}
          />
        ))}
        {filters.tags.map((tag) => (
          <FilterTag
            key={tag}
            label={tag}
            onRemove={() => removeFilter('tags', tag)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="ml-2 hover:text-blue-900"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}