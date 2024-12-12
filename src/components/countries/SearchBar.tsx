import React from 'react';
import { Search } from 'lucide-react';
import { useFilterStore } from '../../store/filterStore';

export function SearchBar() {
  const { filters, setFilter } = useFilterStore();

  return (
    <div className="relative max-w-2xl">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search countries, visa types, or requirements..."
        value={filters.search}
        onChange={(e) => setFilter('search', e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
      />
    </div>
  );
}