import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Camera, CreditCard, FileImage, Calendar, MapPin } from 'lucide-react';
import type { Country } from '../types';

interface RequirementsListProps {
  country: Country;
}

export function RequirementsList({ country }: RequirementsListProps) {
  const requirements = [
    {
      icon: FileImage,
      title: 'Valid Passport',
      description: 'Passport with minimum 6 months validity',
      important: true,
    },
    {
      icon: Camera,
      title: 'Passport Size Photos',
      description: 'Recent photographs with white background',
      important: true,
    },
    {
      icon: CreditCard,
      title: 'Bank Statement',
      description: 'Last 3 months bank statements',
      important: true,
    },
    {
      icon: Calendar,
      title: 'Travel Itinerary',
      description: 'Confirmed return tickets and hotel bookings',
      important: false,
    },
    {
      icon: FileText,
      title: 'Application Form',
      description: 'Completed and signed visa application form',
      important: true,
    },
    {
      icon: MapPin,
      title: 'Address Proof',
      description: 'Recent utility bill or rental agreement',
      important: false,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Document Requirements
        </h3>
        <p className="text-blue-600">
          Ensure all documents are clear and meet the specified requirements to avoid delays.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requirements.map((req, index) => (
          <motion.div
            key={req.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <req.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold mb-1 flex items-center">
                  {req.title}
                  {req.important && (
                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                </h4>
                <p className="text-gray-600 text-sm">{req.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6"
      >
        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
        <ul className="list-disc list-inside space-y-2 text-yellow-700">
          <li>All documents must be in English or officially translated</li>
          <li>Scanned copies should be clear and complete</li>
          <li>Original documents may be required during the visa interview</li>
          <li>Additional documents may be requested based on your application</li>
        </ul>
      </motion.div>
    </div>
  );
}