import React from 'react';
import { RangeSlider } from '../ui/RangeSlider';
import { Checkbox } from '../ui/Checkbox';
import { useFilterStore } from '../../store/filterStore';

const visaTypes = [
  { id: 'sticker', label: 'Sticker Visa' },
  { id: 'e-visa', label: 'e-Visa' },
  { id: 'on-arrival', label: 'Visa on Arrival' },
];

const continents = [
  { id: 'asia', label: 'Asia' },
  { id: 'europe', label: 'Europe' },
  { id: 'americas', label: 'Americas' },
  { id: 'africa', label: 'Africa' },
  { id: 'oceania', label: 'Oceania' },
];

const processingTimes = [
  { id: '24h', label: 'Within 24 hours' },
  { id: '3d', label: '2-3 days' },
  { id: '1w', label: 'Within 1 week' },
  { id: '2w', label: '1-2 weeks' },
];

const tags = [
  { id: 'popular', label: 'Popular Destinations' },
  { id: 'business', label: 'Business Friendly' },
  { id: 'tourist', label: 'Tourist Hotspots' },
  { id: 'quick', label: 'Quick Processing' },
  { id: 'family', label: 'Family Friendly' },
  { id: 'student', label: 'Student Friendly' },
  { id: 'budget', label: 'Budget Friendly' },
];

export function CountryFilters() {
  const { filters, setFilter } = useFilterStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-8 sticky top-24">
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <RangeSlider
          min={0}
          max={50000}
          step={1000}
          value={filters.priceRange}
          onValueChange={(value) => setFilter('priceRange', value)}
          formatValue={(value) => `₹${value.toLocaleString()}`}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Visa Type</h3>
        <div className="space-y-3">
          {visaTypes.map((type) => (
            <Checkbox
              key={type.id}
              id={type.id}
              label={type.label}
              checked={filters.visaTypes.includes(type.id)}
              onChange={() => setFilter('visaTypes', type.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Continents</h3>
        <div className="space-y-3">
          {continents.map((continent) => (
            <Checkbox
              key={continent.id}
              id={continent.id}
              label={continent.label}
              checked={filters.continents.includes(continent.id)}
              onChange={() => setFilter('continents', continent.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Processing Time</h3>
        <div className="space-y-3">
          {processingTimes.map((time) => (
            <Checkbox
              key={time.id}
              id={time.id}
              label={time.label}
              checked={filters.processingTime.includes(time.id)}
              onChange={() => setFilter('processingTime', time.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {tags.map((tag) => (
            <Checkbox
              key={tag.id}
              id={tag.id}
              label={tag.label}
              checked={filters.tags.includes(tag.id)}
              onChange={() => setFilter('tags', tag.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}