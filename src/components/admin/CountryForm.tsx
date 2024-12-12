import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Country, VisaType } from '../../types';

interface CountryFormProps {
  initialData?: Country;
  onSubmit: (data: Partial<Country>) => void;
  onClose: () => void;
}

export function CountryForm({ initialData, onSubmit, onClose }: CountryFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<Partial<Country>>(
    initialData || {
      name: '',
      code: '',
      flag: '',
      visaTypes: [],
      processingTime: '',
      price: 0,
      fees: 0,
      imageUrl: '',
      tags: [],
      continent: '',
      popularity: 0,
      requirements: [],
      isActive: true,
      successRate: 0,
      peakSeason: {
        months: '',
        temperature: '',
        rainfall: '',
        events: []
      },
      attractions: [],
      timeline: [],
      faqs: []
    }
  );

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'visas', label: 'Visa Types' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'season', label: 'Peak Season' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {initialData ? 'Edit Country' : 'Add Country'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex">
          {/* Tabs */}
          <div className="w-48 border-r bg-gray-50 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country Code
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Flag URL
                    </label>
                    <input
                      type="url"
                      value={formData.flag}
                      onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Processing Time
                    </label>
                    <input
                      type="text"
                      value={formData.processingTime}
                      onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Success Rate (%)
                    </label>
                    <input
                      type="number"
                      value={formData.successRate}
                      onChange={(e) => setFormData({ ...formData, successRate: Number(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg"
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base Price
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Fees
                    </label>
                    <input
                      type="number"
                      value={formData.fees}
                      onChange={(e) => setFormData({ ...formData, fees: Number(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags?.join(', ')}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      tags: e.target.value.split(',').map(tag => tag.trim())
                    })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <label className="text-sm text-gray-700">Active</label>
                </div>
              </div>
            )}

            {/* Visa Types Tab */}
            {activeTab === 'visas' && (
              <div className="space-y-4">
                {formData.visaTypes?.map((visa, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Visa Name
                        </label>
                        <input
                          type="text"
                          value={visa.name}
                          onChange={(e) => {
                            const newVisaTypes = [...(formData.visaTypes || [])];
                            newVisaTypes[index] = { ...visa, name: e.target.value };
                            setFormData({ ...formData, visaTypes: newVisaTypes });
                          }}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={visa.duration}
                          onChange={(e) => {
                            const newVisaTypes = [...(formData.visaTypes || [])];
                            newVisaTypes[index] = { ...visa, duration: e.target.value };
                            setFormData({ ...formData, visaTypes: newVisaTypes });
                          }}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newVisaTypes = formData.visaTypes?.filter((_, i) => i !== index);
                        setFormData({ ...formData, visaTypes: newVisaTypes });
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove Visa Type
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      visaTypes: [
                        ...(formData.visaTypes || []),
                        { id: '', name: '', duration: '', price: 0, processingTime: '', type: 'sticker' }
                      ]
                    });
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
                >
                  + Add Visa Type
                </button>
              </div>
            )}

            {/* Requirements Tab */}
            {activeTab === 'requirements' && (
              <div className="space-y-4">
                {formData.requirements?.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => {
                        const newRequirements = [...(formData.requirements || [])];
                        newRequirements[index] = e.target.value;
                        setFormData({ ...formData, requirements: newRequirements });
                      }}
                      className="flex-1 px-4 py-2 border rounded-lg"
                      placeholder="Enter requirement"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newRequirements = formData.requirements?.filter((_, i) => i !== index);
                        setFormData({ ...formData, requirements: newRequirements });
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      requirements: [...(formData.requirements || []), '']
                    });
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
                >
                  + Add Requirement
                </button>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-4">
                {formData.timeline?.map((step, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Step Number
                        </label>
                        <input
                          type="number"
                          value={step.step}
                          onChange={(e) => {
                            const newTimeline = [...(formData.timeline || [])];
                            newTimeline[index] = { ...step, step: Number(e.target.value) };
                            setFormData({ ...formData, timeline: newTimeline });
                          }}
                          className="w-full px-4 py-2 border rounded-lg"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const newTimeline = [...(formData.timeline || [])];
                            newTimeline[index] = { ...step, title: e.target.value };
                            setFormData({ ...formData, timeline: newTimeline });
                          }}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={step.description}
                        onChange={(e) => {
                          const newTimeline = [...(formData.timeline || [])];
                          newTimeline[index] = { ...step, description: e.target.value };
                          setFormData({ ...formData, timeline: newTimeline });
                        }}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={2}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newTimeline = formData.timeline?.filter((_, i) => i !== index);
                        setFormData({ ...formData, timeline: newTimeline });
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove Step
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      timeline: [
                        ...(formData.timeline || []),
                        { step: (formData.timeline?.length || 0) + 1, title: '', description: '' }
                      ]
                    });
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
                >
                  + Add Timeline Step
                </button>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {initialData ? 'Update Country' : 'Add Country'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}