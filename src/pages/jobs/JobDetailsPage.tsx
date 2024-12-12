import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Calendar,
  Building,
  CheckCircle
} from 'lucide-react';
import { jobOpenings } from '../../data/jobs';
import { JobApplicationForm } from '../../components/jobs/JobApplicationForm';

export function JobDetailsPage() {
  const { id } = useParams();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  const job = jobOpenings.find(j => j.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
          <p className="mt-2 text-gray-600">The job posting you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {job.department}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {job.type}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {job.salary}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowApplicationForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Team Size</p>
                <p className="font-medium">{job.teamSize} members</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Posted On</p>
                <p className="font-medium">{job.postedDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{job.experience}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600">{job.description}</p>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="font-medium">Team Size</p>
                  <p className="text-gray-600">{job.teamSize} members</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-gray-600">{job.experience}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="font-medium">Posted</p>
                  <p className="text-gray-600">{job.postedDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">{job.location}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Responsibilities</h2>
          <ul className="space-y-4">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-600">{responsibility}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Requirements</h2>
          <ul className="space-y-4">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <span className="text-gray-600">{requirement}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {job.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                <span className="text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <JobApplicationForm
          jobTitle={job.title}
          onClose={() => setShowApplicationForm(false)}
          onSubmit={(data) => {
            console.log('Application submitted:', data);
            setShowApplicationForm(false);
            // Show success message or redirect
          }}
        />
      )}
    </div>
  );
}