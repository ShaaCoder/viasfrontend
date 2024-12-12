import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, AlertCircle, Check } from 'lucide-react';
import { DocumentScanner } from '../ai/DocumentScanner';

interface FormData {
  category: string;
  subject: string;
  description: string;
  applicationId?: string;
  priority: 'low' | 'medium' | 'high';
  attachments: File[];
}

export function SupportTicketForm() {
  const [formData, setFormData] = useState<FormData>({
    category: '',
    subject: '',
    description: '',
    applicationId: '',
    priority: 'medium',
    attachments: [],
  });

  const [showScanner, setShowScanner] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const categories = [
    'Visa Application',
    'Document Requirements',
    'Payment Issues',
    'Technical Support',
    'Application Status',
    'Other',
  ];

  const handleDescriptionChange = (value: string) => {
    setFormData({ ...formData, description: value });
    
    // Simulate AI-powered suggestions
    if (value.length > 10) {
      setAiSuggestions([
        'Have you checked your application status in the dashboard?',
        'Our document verification tool might help resolve this issue',
        'You can upload your documents for AI-powered verification',
      ]);
    } else {
      setAiSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Create Support Ticket</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application ID (Optional)
          </label>
          <input
            type="text"
            value={formData.applicationId}
            onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            required
          />
          
          {aiSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-3 bg-blue-50 rounded-lg"
            >
              <div className="flex items-center space-x-2 text-sm text-blue-700 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>AI Suggestions:</span>
              </div>
              <ul className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-sm text-blue-600 cursor-pointer hover:text-blue-700"
                  >
                    <Check className="w-4 h-4" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <div className="flex space-x-4">
            {['low', 'medium', 'high'].map((priority) => (
              <label key={priority} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={priority}
                  checked={formData.priority === priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="capitalize">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Use Document Scanner
            </button>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              multiple
              onChange={(e) => setFormData({ ...formData, attachments: Array.from(e.target.files || []) })}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, JPG, PNG
              </p>
            </label>
          </div>
          
          {formData.attachments.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                {formData.attachments.length} file(s) selected
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <FileText className="w-5 h-5" />
          <span>Submit Ticket</span>
        </button>
      </form>

      {showScanner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Document Scanner</h3>
              <button
                onClick={() => setShowScanner(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <DocumentScanner />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}