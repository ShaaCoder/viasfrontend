import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle } from 'lucide-react';
import { ApplicationTracker } from '../components/application/ApplicationTracker';

export function TrackApplicationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">Track Your Application</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Enter your application ID to check the status and progress
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: FileText,
              title: 'Easy Tracking',
              description: 'Track your application with a unique ID'
            },
            {
              icon: Clock,
              title: 'Real-time Updates',
              description: 'Get instant status updates on your application'
            },
            {
              icon: CheckCircle,
              title: 'Document Status',
              description: 'Check the verification status of your documents'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <feature.icon className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <ApplicationTracker />
      </div>
    </div>
  );
}