import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, AlertCircle } from 'lucide-react';
import { ApplicationTimeline } from './ApplicationTimeline';

export function ApplicationTracker() {
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');
  const [application, setApplication] = useState(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch(`https://visa-five.vercel.app/applications/${trackingId}`);
      
      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error('No application found with this tracking ID');
      }
  
      // Try to parse the response as JSON
      const data = await response.json();
      
      // Set the application data if it's valid
      setApplication(data);
    } catch (err) {
      // Catch any error (including JSON parsing errors) and set the error message
      setError('No application found with this tracking ID or invalid response format');
      console.error(err); // Optional: log the error for debugging
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Track Your Application</h2>
        <form onSubmit={handleTrack} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your 10-digit application ID"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FileText className="w-5 h-5" />
            <span>Track Application</span>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">
                  {application.country} - {application.type}
                </h3>
                <p className="text-gray-600">Application ID: {application._id}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'approved'
                    ? 'bg-green-100 text-green-600'
                    : application.status === 'rejected'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>
          </div>

          <ApplicationTimeline steps={application.steps} />

          <div className="mt-6 space-y-4">
            <h4 className="font-semibold">Documents Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {application.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <span>{doc.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'verified'
                        ? 'bg-green-100 text-green-600'
                        : doc.status === 'rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
