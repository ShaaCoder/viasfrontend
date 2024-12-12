import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { useApplicationStore } from '../../store/applicationStore';
import { VisaApplicationForm } from '../../components/application/VisaApplicationForm';
import { ApplicationTimeline } from '../../components/application/ApplicationTimeline';

export function UserDashboard() {
  const [showNewApplication, setShowNewApplication] = useState(false);
  const applications = useApplicationStore((state) => state.applications);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="mt-2 text-gray-600">Track your visa applications and documents</p>
          </div>
          <button
            onClick={() => setShowNewApplication(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Application</span>
          </button>
        </div>

        {showNewApplication ? (
          <VisaApplicationForm />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[{
                  icon: FileText,
                  label: 'Total Applications',
                  value: applications.length || '0',
                },
                {
                  icon: Clock,
                  label: 'In Progress',
                  value: applications.filter(app => app.status === 'processing').length,
                },
                {
                  icon: CheckCircle,
                  label: 'Approved',
                  value: applications.filter(app => app.status === 'approved').length,
                },
                {
                  icon: AlertCircle,
                  label: 'Pending Documents',
                  value: applications.filter(app => app.documents.some(doc => doc.status === 'pending')).length,
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                    <stat.icon className="w-8 h-8 text-blue-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Applications List */}
            <div className="space-y-6">
              {applications.map((application) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {application.country} - {application.type}
                        </h2>
                        <p className="text-gray-600">Application ID: {application.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${application.status === 'processing' ? 'bg-blue-100 text-blue-600' : application.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>

                    <ApplicationTimeline steps={application.steps} />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
