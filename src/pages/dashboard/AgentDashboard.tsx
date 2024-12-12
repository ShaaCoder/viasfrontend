import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, DollarSign, Calendar, Search, Filter, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

export function AgentDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(''); // Filter for status
  const [applications, setApplications] = useState<any[]>([]); // Manage applications state
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    // Fetch applications data when the component is mounted
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://visa-five.vercel.app/applications/');
        setApplications(response.data); // Set the fetched applications
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-yellow-100 text-yellow-800'; // Accepted status
      case 'pending': return 'bg-gray-100 text-gray-800'; // Pending status
      default: return 'bg-gray-100 text-gray-800'; // Default for unknown status
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`https://visa-five.vercel.app/applications/${id}`);
      if (response.status === 200) {
        setApplications(applications.filter(app => app._id !== id)); // Remove the deleted application from the state
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'approved' ? 'rejected' :
                      currentStatus === 'rejected' ? 'processing' :
                      currentStatus === 'processing' ? 'accepted' : 'approved'; // Loop through status values
    try {
      const response = await axios.put(`https://visa-five.vercel.app/applications/${id}`, { status: newStatus });
      if (response.status === 200) {
        setApplications(applications.map(app => app._id === id ? { ...app, status: newStatus } : app)); // Update the application status
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your assigned applications</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{ icon: FileText, label: 'Total Applications', value: applications.length },
            { icon: Clock, label: 'Processing', value: applications.filter(app => app.status === 'processing').length },
            { icon: CheckCircle, label: 'Approved', value: applications.filter(app => app.status === 'approved').length },
            { icon: XCircle, label: 'Rejected', value: applications.filter(app => app.status === 'rejected').length }].map((stat, index) => (
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

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-lg px-4 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option> {/* New accepted option */}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.filter(app =>
                  (statusFilter ? app.status === statusFilter : true) &&
                  (searchQuery ? app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                ).map((application, index) => (
                  <tr key={`${application._id || index}-${application.applicantName}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application._id || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.country}</div>
                      <div className="text-sm text-gray-500">{application.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button onClick={() => handleStatusUpdate(application._id, application.status)} className="text-indigo-600 hover:text-indigo-900">
                        Update Status
                      </button>
                      <button onClick={() => handleDelete(application._id)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
