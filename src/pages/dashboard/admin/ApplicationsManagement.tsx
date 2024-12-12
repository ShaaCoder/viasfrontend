import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText 
} from 'lucide-react';

export function ApplicationsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [applications, setApplications] = useState<any[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('https://visa-five.vercel.app/applications'); // Update API endpoint if needed
        if (!response.ok) throw new Error('Failed to fetch applications');
        const data = await response.json();
        
        // Map the _id to id for easier handling in frontend
        const mappedData = data.map((app: any) => ({
          ...app,
          id: app._id,  // Map _id to id
        }));

        setApplications(mappedData);
      } catch (error) {
        console.error('Error fetching applications:', error.message);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    console.log("handleStatusChange called with ID:", appId, "Status:", newStatus);
  
    // Check if the ID is valid
    if (!appId) {
      console.error("No ID provided for status change.");
      return;
    }
  
    try {
      const response = await fetch(`https://visa-five.vercel.app/applications/${appId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }
  
      console.log("Status updated successfully");
  
      // Update the application status in the state immediately after a successful update
      setApplications((prevApplications) => {
        return prevApplications.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        );
      });
  
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };
  
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      (app.id && app.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.applicantName &&
        app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !statusFilter || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = applications.filter((app) => app.status === 'pending').length;
  const processingCount = applications.filter((app) => app.status === 'processing').length;
  const approvedCount = applications.filter((app) => app.status === 'approved').length;
  const rejectedCount = applications.filter((app) => app.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[{
          label: 'Total Applications',
          count: applications.length,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          bgColor: 'bg-blue-50',
        }, {
          label: 'Processing',
          count: processingCount,
          icon: <Clock className="w-6 h-6 text-yellow-600" />,
          bgColor: 'bg-yellow-50',
        }, {
          label: 'Approved',
          count: approvedCount,
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          bgColor: 'bg-green-50',
        }, {
          label: 'Rejected',
          count: rejectedCount,
          icon: <XCircle className="w-6 h-6 text-red-600" />,
          bgColor: 'bg-red-50',
        }].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
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
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Application ID', 'Applicant', 'Status', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredApplications.map((app) => (
                <tr key={app._id} className="border-b"> {/* Use _id here */}
                  <td className="px-6 py-4 text-sm text-gray-900">{app._id}</td> {/* Use _id here */}
                  <td className="px-6 py-4 text-sm text-gray-500">{app.applicantName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                  <td className="px-6 py-4 space-x-2">
  <button
    onClick={() => handleStatusChange(app._id, 'approved')}
    className="text-blue-600"
  >
    Approve
  </button>
  <button
    onClick={() => handleStatusChange(app._id, 'rejected')}
    className="text-red-600"
  >
    Reject
  </button>
</td>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
