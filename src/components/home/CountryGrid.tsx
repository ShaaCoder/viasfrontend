import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCountryStore } from '../../store/countryStore';

export function CountryGrid() {
  const navigate = useNavigate();
  const { countries } = useCountryStore();
  
  // Get only top 6 active and most popular countries
  const popularCountries = countries
    .filter(country => country.isActive && country.popularity >= 8)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
        <Link 
          to="/countries"
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          View all countries
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularCountries.map((country, index) => (
          <motion.div
            key={country.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => navigate(`/countries/${country.id}`)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={country.imageUrl}
                alt={country.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              {country.popularity >= 8 && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <h3 className="text-xl font-semibold">{country.name}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">
                    Processing: {country.processingTime}
                  </span>
                  <span className="font-semibold">
                    From ₹{country.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}