import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Globe, FileText, ChevronDown, Camera, Plane, Shield, Award } from 'lucide-react';
import { countryData } from '../data/countries';
import { VisaTimeline } from '../components/VisaTimeline';
import { VisaTypes } from '../components/VisaTypes';
import { TouristAttractions } from '../components/TouristAttractions';
import { RequirementsList } from '../components/RequirementsList';
import { FAQSection } from '../components/FAQSection';

export function CountryDetailsPage() {
  const { id } = useParams();
  const country = countryData.find((c) => c.id === id);
  const [activeSection, setActiveSection] = useState('overview');

  if (!country) {
    return <div>Country not found</div>;
  }

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'timeline', label: 'Process' },
    { id: 'attractions', label: 'Tourist Guide' },
    { id: 'faq', label: 'FAQs' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        className="relative h-[500px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={country.imageUrl}
          alt={country.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-8 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-12 h-12 rounded-full border-2 border-white mr-4"
              />
              <div>
                <h1 className="text-5xl font-bold mb-2">
                  {country.name} Visa
                </h1>
                <p className="text-xl text-gray-200">
                  Fast & Hassle-free Visa Processing
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Processing Time</p>
                  <p className="font-semibold">{country.processingTime}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Success Rate</p>
                  <p className="font-semibold">99% Approved</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Visa Type</p>
                  <p className="font-semibold">{country.visaTypes[0].type}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Starting from</p>
                  <p className="font-semibold">₹{country.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'overview' && (
              <section className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Camera className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">AI-Powered Photo Verification</h3>
                    <p className="text-gray-600">Instant feedback on passport photos and documents</p>
                  </motion.div>

                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Expert Review</h3>
                    <p className="text-gray-600">Double verification by visa experts</p>
                  </motion.div>

                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                    <p className="text-gray-600">Round-the-clock assistance in multiple languages</p>
                  </motion.div>
                </div>

                <VisaTypes />
              </section>
            )}

            {activeSection === 'requirements' && <RequirementsList country={country} />}
            {activeSection === 'timeline' && <VisaTimeline />}
            {activeSection === 'attractions' && <TouristAttractions country={country} />}
            {activeSection === 'faq' && <FAQSection country={country} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}