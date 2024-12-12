import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Check, Clock, AlertCircle } from 'lucide-react';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

interface ApplicationTimelineProps {
  steps: TimelineStep[];
}

export function ApplicationTimeline({ steps }: ApplicationTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-8"
        >
          {/* Timeline line */}
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
          )}

          {/* Timeline dot */}
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

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{step.title}</h3>
              {step.date && (
                <span className="text-sm text-gray-500">{step.date}</span>
              )}
            </div>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}