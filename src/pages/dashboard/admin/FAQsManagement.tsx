import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Filter,
  Globe,
  FileText,
  DollarSign,
  Clock
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
  lastUpdated: string;
  views: number;
}

const mockFAQs: FAQ[] = [
  {
    id: 'FAQ-001',
    question: 'What documents are required for a tourist visa?',
    answer: 'Required documents typically include a valid passport, passport-size photos, bank statements, travel itinerary, and accommodation details.',
    category: 'Visa Requirements',
    isPublished: true,
    lastUpdated: '2024-03-10',
    views: 1234
  },
  {
    id: 'FAQ-002',
    question: 'How long does visa processing take?',
    answer: 'Standard processing time is 5-7 business days. Express processing options are available for urgent requests.',
    category: 'Processing Time',
    isPublished: true,
    lastUpdated: '2024-03-09',
    views: 2156
  },
  {
    id: 'FAQ-003',
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, net banking, UPI, and international wire transfers.',
    category: 'Payment',
    isPublished: true,
    lastUpdated: '2024-03-08',
    views: 987
  }
];

const categories = [
  'Visa Requirements',
  'Processing Time',
  'Payment',
  'Document Verification',
  'Travel Insurance',
  'Application Process'
];

export function FAQsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs Management</h1>
          <p className="text-gray-600">Manage frequently asked questions and categories</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add FAQ
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total FAQs', value: mockFAQs.length, icon: MessageSquare },
          { label: 'Categories', value: categories.length, icon: Filter },
          { label: 'Published', value: mockFAQs.filter(f => f.isPublished).length, icon: Globe },
          { label: 'Total Views', value: '4.5K', icon: FileText }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Filters and Search */}
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQs List */}
        <div className="divide-y">
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      faq.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {faq.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <span>{faq.category}</span>
                    <span>•</span>
                    <span>Last updated: {new Date(faq.lastUpdated).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{faq.views} views</span>
                  </div>

                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-gray-600"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {filteredFAQs.length} of {filteredFAQs.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}