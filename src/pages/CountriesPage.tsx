import React from 'react';
import { motion } from 'framer-motion';
import { CountryFilters } from '../components/countries/CountryFilters';
import { CountryList } from '../components/countries/CountryList';
import { SearchBar } from '../components/countries/SearchBar';
import { ActiveFilters } from '../components/countries/ActiveFilters';

export function CountriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Visa Destinations
          </h1>
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4"
          >
            <CountryFilters />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:w-3/4"
          >
            <ActiveFilters />
            <CountryList />
          </motion.div>
        </div>
      </div>
    </div>
  );
}