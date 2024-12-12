import { useMemo } from 'react';
import { useFilterStore } from '../store/filterStore';
import { useCountryStore } from '../store/countryStore';

export function useFilteredCountries() {
  const filters = useFilterStore((state) => state.filters);
  const { countries } = useCountryStore();

  return useMemo(() => {
    // First filter by active status - only show active countries
    let filtered = countries.filter(country => country.isActive === true);

    // Then apply other filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchLower) ||
        country.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        country.visaTypes.some((type) => type.name.toLowerCase().includes(searchLower))
      );
    }

    if (filters.continents.length > 0) {
      filtered = filtered.filter((country) =>
        filters.continents.includes(country.continent)
      );
    }

    if (filters.visaTypes.length > 0) {
      filtered = filtered.filter((country) =>
        country.visaTypes.some((type) =>
          filters.visaTypes.includes(type.type)
        )
      );
    }

    filtered = filtered.filter(
      (country) =>
        country.price >= filters.priceRange[0] &&
        country.price <= filters.priceRange[1]
    );

    if (filters.processingTime.length > 0) {
      filtered = filtered.filter((country) =>
        filters.processingTime.includes(country.processingTime)
      );
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter((country) =>
        filters.tags.some((tag) => country.tags.includes(tag))
      );
    }

    return filtered;
  }, [filters, countries]);
}