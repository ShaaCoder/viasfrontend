import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle } from 'lucide-react';
import { useTrackingStore } from '../../store/trackingStore';
import { TrackingTimeline } from './TrackingTimeline';

export function TrackingSearch() {
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');
  const getApplication = useTrackingStore((state) => state.getApplication);
  const [application, setApplication] = useState(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const foundApplication = getApplication(trackingId);
    if (foundApplication) {
      setApplication(foundApplication);
    } else {
      setError('No application found with this tracking ID');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Track Your Application</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your 10-digit application ID"
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Track Application
          </button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-red-50 rounded-lg flex items-center space-x-2 text-red-600"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}
      </motion.div>

      {application && (
        <TrackingTimeline application={application} />
      )}
    </div>
  );
}