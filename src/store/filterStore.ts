import { create } from 'zustand';
import type { FilterState } from '../types';

interface FilterStore {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: any) => void;
  removeFilter: (key: keyof FilterState, value: any) => void;
  clearFilters: () => void;
}

const initialState: FilterState = {
  continents: [],
  visaTypes: [],
  priceRange: [0, 50000],
  processingTime: [],
  tags: [],
  search: '',
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: initialState,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: Array.isArray(state.filters[key])
          ? state.filters[key].includes(value)
            ? state.filters[key].filter((item: any) => item !== value)
            : [...state.filters[key], value]
          : value,
      },
    })),
  removeFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: Array.isArray(state.filters[key])
          ? state.filters[key].filter((item: any) => item !== value)
          : initialState[key],
      },
    })),
  clearFilters: () => set({ filters: initialState }),
}));