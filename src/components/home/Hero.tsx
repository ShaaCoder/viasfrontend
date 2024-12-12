import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Plane, Globe, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { countryData } from '../../data/countries';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof countryData>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const filtered = countryData
        .filter(country => 
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          country.visaTypes.some(type => type.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/countries?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Your Journey Begins Here
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Fast, reliable visa services with AI-powered assistance. Get your visa approved in the shortest possible time.
        </motion.p>
        
        <div className="max-w-2xl mx-auto relative">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Where do you want to travel?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-lg shadow-sm"
              />
            </div>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100"
            >
              {suggestions.map((country) => (
                <div
                  key={country.id}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    navigate(`/countries/${country.id}`);
                    setShowSuggestions(false);
                    setSearchQuery('');
                  }}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-6 h-6 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{country.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{country.processingTime}</span>
                      <span className="mx-2">•</span>
                      <span>From ₹{country.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600"
        >
          <span className="flex items-center">
            <Plane className="w-4 h-4 mr-1 text-blue-500" />
            Popular:
          </span>
          {countryData
            .filter(country => country.popularity >= 9)
            .slice(0, 5)
            .map((country) => (
              <button
                key={country.id}
                onClick={() => navigate(`/countries/${country.id}`)}
                className="bg-white px-4 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2"
              >
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-4 h-4 rounded-full"
                />
                <span>{country.name}</span>
              </button>
            ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Globe className="w-5 h-5 text-blue-500" />
            <span>190+ Countries</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>Fast Processing</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span>AI-Powered</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}