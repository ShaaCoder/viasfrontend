import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { VisaTypeCard } from './VisaTypeCard';

const visaTypes = [
  {
    type: 'eVisa',
    title: 'Tourist Visa - 30 Days Single Entry',
    withInsurance: true,
    duration: '30 Days',
    validity: '60 Days',
    processingTime: '2-3 Days',
    price: 6550,
  },
  {
    type: 'eVisa',
    title: 'Tourist Visa - 30 Days Single Entry',
    withInsurance: false,
    duration: '30 Days',
    validity: '60 Days',
    processingTime: '2-3 Days',
    price: 6530,
  },
  {
    type: 'eVisa',
    title: 'Tourist Visa - 30 Days Single Entry - Express',
    withInsurance: true,
    duration: '30 Days',
    validity: '60 Days',
    processingTime: '24 hours',
    price: 10000,
    warning: 'Please note a minor visa has to be applied along with the parent visa only.',
  },
  {
    type: 'eVisa',
    title: 'Tourist Visa - 30 Days Multiple Entry',
    withInsurance: true,
    duration: '30 Days',
    validity: '60 Days',
    processingTime: '4-5 Days',
    price: 11500,
    warning: 'Please note a minor visa has to be applied along with the parent visa only.',
  },
  {
    type: 'eVisa',
    title: 'Tourist Visa - 60 Days Multiple Entry',
    withInsurance: true,
    duration: '60 Days',
    validity: '60 Days',
    processingTime: '4-5 Days',
    price: 17400,
    warning: 'Please note a minor visa has to be applied along with the parent visa only.',
  },
  {
    type: 'Ok to Board',
    title: 'Tourist Visa - OK to Board',
    duration: '-',
    validity: '-',
    processingTime: '3 Days',
    price: 900,
    warning: 'Ok To Board is required if your passport last page has a ECR check required',
  },
];

export function VisaTypes() {
  const [showAll, setShowAll] = useState(false);
  const displayedVisaTypes = showAll ? visaTypes : visaTypes.slice(0, 3);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {displayedVisaTypes.map((visa, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <VisaTypeCard {...visa} />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center"
      >
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <span>{showAll ? 'Show Less' : 'View More Options'}</span>
          {showAll ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </motion.div>
    </div>
  );
}