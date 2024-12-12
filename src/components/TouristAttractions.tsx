import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Sun, Moon, Umbrella, ThermometerSun } from 'lucide-react';
import type { Country } from '../types';

interface TouristAttractionsProps {
  country: Country;
}

const attractions = {
  dubai: [
    {
      name: 'Burj Khalifa',
      description: 'World\'s tallest building with observation decks offering panoramic views',
      image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5',
      type: 'Landmark'
    },
    {
      name: 'Dubai Mall',
      description: 'One of the world\'s largest shopping centers with entertainment options',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f',
      type: 'Shopping'
    },
    {
      name: 'Palm Jumeirah',
      description: 'Artificial archipelago with luxury hotels and restaurants',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      type: 'Landmark'
    }
  ],
  singapore: [
    {
      name: 'Gardens by the Bay',
      description: 'Futuristic nature park with giant Supertree structures',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
      type: 'Nature'
    },
    {
      name: 'Marina Bay Sands',
      description: 'Iconic hotel with infinity pool and observation deck',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
      type: 'Landmark'
    }
  ],
  // Add more countries here
};

const bestTimeToVisit = {
  dubai: {
    peak: 'November to March',
    weather: 'Cool and pleasant',
    events: ['Dubai Shopping Festival', 'Dubai Food Festival'],
    temperature: '20°C - 30°C',
    rainfall: 'Minimal'
  },
  singapore: {
    peak: 'December to June',
    weather: 'Less rainfall',
    events: ['Singapore Food Festival', 'Singapore Night Festival'],
    temperature: '25°C - 32°C',
    rainfall: 'Moderate'
  }
  // Add more countries here
};

export function TouristAttractions({ country }: TouristAttractionsProps) {
  const countryAttractions = attractions[country.id as keyof typeof attractions] || [];
  const visitInfo = bestTimeToVisit[country.id as keyof typeof bestTimeToVisit];

  return (
    <div className="space-y-12">
      {/* Best Time to Visit */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Best Time to Visit</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Peak Season</p>
                  <p className="font-medium">{visitInfo?.peak}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <ThermometerSun className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Temperature</p>
                  <p className="font-medium">{visitInfo?.temperature}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Umbrella className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rainfall</p>
                  <p className="font-medium">{visitInfo?.rainfall}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Popular Events</h3>
            <div className="flex flex-wrap gap-2">
              {visitInfo?.events.map((event) => (
                <span key={event} className="bg-white px-3 py-1 rounded-full text-sm text-blue-600">
                  {event}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Attractions */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Popular Attractions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countryAttractions.map((attraction, index) => (
            <motion.div
              key={attraction.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white mb-2">
                    {attraction.type}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-1">{attraction.name}</h3>
                  <p className="text-sm text-gray-200">{attraction.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Travel Tips */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Travel Tips</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Do's</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">✓</span>
                  <span>Respect local customs and dress modestly</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">✓</span>
                  <span>Carry your passport copy at all times</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">✓</span>
                  <span>Use official taxi services or public transport</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Don'ts</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5">×</span>
                  <span>Take photographs without permission</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5">×</span>
                  <span>Display public affection</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5">×</span>
                  <span>Drink alcohol in public places</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}