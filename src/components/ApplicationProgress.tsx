import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useApplicationStore } from '../store/applicationStore';
import type { ApplicationStatus } from '../types';

const steps: { id: ApplicationStatus['step']; label: string }[] = [
  { id: 'form', label: 'Form completed' },
  { id: 'processing', label: 'Processing' },
  { id: 'appointment', label: 'Appointment' },
  { id: 'approval', label: 'Approval' },
];

export function ApplicationProgress() {
  const application = useApplicationStore((state) => state.currentApplication);

  if (!application) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Application Status</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">to</span>
          <span className="font-medium">{application.country}</span>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = application.step === step.id;
          const isCompleted = steps.findIndex(s => s.id === application.step) > index;

          return (
            <div key={step.id} className="flex items-center space-x-3">
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : isActive ? (
                <Clock className="w-5 h-5 text-blue-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
              <span className={isActive ? 'font-medium' : 'text-gray-500'}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Name</span>
          <span className="font-medium">{application.applicantName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Travel dates</span>
          <span className="font-medium">{application.travelDates}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Address</span>
          <span className="font-medium">{application.address}</span>
        </div>
      </div>
    </div>
  );
}