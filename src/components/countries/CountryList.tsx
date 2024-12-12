import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFilteredCountries } from '../../hooks/useFilteredCountries';

export function CountryList() {
  const countries = useFilteredCountries();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {countries.map((country, index) => (
        <motion.div
          key={country.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate(`/countries/${country.id}`)}
        >
          <div className="relative h-48">
            <img
              src={country.imageUrl}
              alt={country.name}
              className="w-full h-full object-cover"
            />
            {country.popularity > 8 && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
                Popular
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <h3 className="text-xl font-semibold">{country.name}</h3>
              </div>
              <span className="text-sm font-medium text-blue-600">
                View Details →
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{country.processingTime} processing</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-5 h-5 mr-2" />
                <span>From ₹{country.price.toLocaleString()}</span>
              </div>
              {country.visaTypes.map((type) => (
                <div key={type.id} className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-2" />
                  <span>{type.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {country.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}