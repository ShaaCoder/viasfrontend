import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from 'lucide-react';

interface AnalyticsStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
}

interface TopCountry {
  name: string;
  applications: number;
  revenue: number;
  successRate: number;
}

const mockStats: AnalyticsStat[] = [
  {
    label: 'Total Applications',
    value: '15,234',
    change: '+12.5%',
    trend: 'up',
    icon: Users
  },
  {
    label: 'Revenue',
    value: '₹1.2M',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign
  },
  {
    label: 'Success Rate',
    value: '94.5%',
    change: '+2.4%',
    trend: 'up',
    icon: TrendingUp
  },
  {
    label: 'Processing Time',
    value: '3.2 days',
    change: '-0.5 days',
    trend: 'down',
    icon: Calendar
  }
];

const mockTopCountries: TopCountry[] = [
  {
    name: 'United States',
    applications: 3245,
    revenue: 2500000,
    successRate: 95.5
  },
  {
    name: 'United Kingdom',
    applications: 2890,
    revenue: 2100000,
    successRate: 94.2
  },
  {
    name: 'Canada',
    applications: 2456,
    revenue: 1800000,
    successRate: 96.1
  },
  {
    name: 'Australia',
    applications: 2123,
    revenue: 1500000,
    successRate: 93.8
  },
  {
    name: 'Germany',
    applications: 1987,
    revenue: 1400000,
    successRate: 95.2
  }
];

export function AnalyticsManagement() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track key metrics and performance indicators</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded-lg px-4 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                <div className="mt-1 flex items-center">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Countries */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Countries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTopCountries.map((country, index) => (
                <motion.tr
                  key={country.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{country.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{country.applications.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Total applications</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{(country.revenue / 100000).toFixed(1)}L</div>
                    <div className="text-sm text-gray-500">Total revenue</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${country.successRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{country.successRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">+{(Math.random() * 10).toFixed(1)}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'Approved', value: 75, color: 'bg-green-500' },
              { label: 'Pending', value: 15, color: 'bg-yellow-500' },
              { label: 'In Review', value: 8, color: 'bg-blue-500' },
              { label: 'Rejected', value: 2, color: 'bg-red-500' }
            ].map((status) => (
              <div key={status.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{status.label}</span>
                  <span className="font-medium">{status.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${status.color} h-2 rounded-full`}
                    style={{ width: `${status.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Time Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time Trends</h3>
          <div className="space-y-6">
            {[
              { type: 'Tourist Visa', time: '3.2 days', trend: -0.5 },
              { type: 'Business Visa', time: '4.5 days', trend: -0.3 },
              { type: 'Student Visa', time: '5.1 days', trend: -0.2 },
              { type: 'Work Visa', time: '6.8 days', trend: -0.4 }
            ].map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{item.type}</p>
                  <p className="text-sm text-gray-500">Average processing time</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{item.time}</p>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    <span>{item.trend} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}