import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, AlertCircle, FileText } from 'lucide-react';
import type { TrackingApplication } from '../../store/trackingStore';

interface TrackingTimelineProps {
  application: TrackingApplication;
}

export function TrackingTimeline({ application }: TrackingTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-semibold">
            {application.country} - {application.type}
          </h3>
          <p className="text-gray-600">Application ID: {application.id}</p>
          <p className="text-gray-600">Applicant: {application.applicantName}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          application.status === 'approved'
            ? 'bg-green-100 text-green-600'
            : application.status === 'rejected'
            ? 'bg-red-100 text-red-600'
            : 'bg-blue-100 text-blue-600'
        }`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      <div className="space-y-6">
        {application.steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8"
          >
            {index < application.steps.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
            )}

            <div className={`absolute left-0 top-2 w-8 h-8 rounded-full flex items-center justify-center ${
              step.status === 'completed' ? 'bg-green-100' :
              step.status === 'current' ? 'bg-blue-100' :
              'bg-gray-100'
            }`}>
              {step.status === 'completed' ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : step.status === 'current' ? (
                <Clock className="w-5 h-5 text-blue-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{step.title}</h4>
                {step.date && (
                  <span className="text-sm text-gray-500">{step.date}</span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="font-semibold mb-4">Document Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {application.documents.map((doc) => (
            <div
              key={doc.name}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span>{doc.name}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                doc.status === 'verified'
                  ? 'bg-green-100 text-green-600'
                  : doc.status === 'rejected'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}