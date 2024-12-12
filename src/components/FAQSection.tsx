import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Country } from '../types';

interface FAQSectionProps {
  country: Country;
}

export function FAQSection({ country }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: `Does ${country.name} offer visa on arrival to Indians?`,
      answer: 'The visa requirements vary based on your nationality and purpose of visit. Please check the specific requirements for your case.',
    },
    {
      question: `Is my ${country.name} visa single or multiple entry?`,
      answer: 'We offer both single and multiple entry visas. The type of entry depends on the visa category you choose.',
    },
    {
      question: `When should I apply for a ${country.name} visa before my trip?`,
      answer: `We recommend applying at least ${country.processingTime} before your planned travel date to ensure smooth processing.`,
    },
    {
      question: 'What happens if my visa application is rejected?',
      answer: 'In case of rejection, we provide a full refund of the visa fees (excluding service charges). We also help you understand the reason for rejection and guide you for a fresh application if possible.',
    },
    {
      question: 'Can I track my visa application status?',
      answer: 'Yes, you can track your application status in real-time through our online portal. We also send regular email and SMS updates.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full py-4 flex items-center justify-between text-left"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}