import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Globe,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Activity,
  Settings,
  BarChart2 as BarChart
} from 'lucide-react';

export function AdminOverview() {
  const stats = [
    {
      label: 'Total Users',
      value: '15,234',
      change: '+12.5%',
      trend: 'up',
      icon: Users
    },
    {
      label: 'Active Applications',
      value: '1,432',
      change: '+8.2%',
      trend: 'up',
      icon: FileText
    },
    {
      label: 'Countries',
      value: '190',
      change: '+2',
      trend: 'up',
      icon: Globe
    },
    {
      label: 'Revenue',
      value: '₹12.4M',
      change: '-2.4%',
      trend: 'down',
      icon: DollarSign
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`ml-2 text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change} from last month
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              {
                action: 'New visa application submitted',
                time: '2 minutes ago',
                user: 'John Doe'
              },
              {
                action: 'Payment received',
                time: '15 minutes ago',
                user: 'Sarah Smith'
              },
              {
                action: 'Document verified',
                time: '1 hour ago',
                user: 'Mike Johnson'
              },
              {
                action: 'Support ticket resolved',
                time: '2 hours ago',
                user: 'Emily Brown'
              }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Country', icon: Globe },
              { label: 'Add Visa Type', icon: FileText },
              { label: 'View Reports', icon: BarChart },
              { label: 'System Settings', icon: Settings }
            ].map((action) => (
              <button
                key={action.label}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <action.icon className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}