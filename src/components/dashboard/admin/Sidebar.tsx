import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  FileText,
  Users,
  MessageSquare,
  CreditCard,
  BarChart2,
  HelpCircle,
  Settings,
  FileCheck
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/admin' },
  { icon: Globe, label: 'Countries', path: '/dashboard/admin/countries' },
  { icon: FileText, label: 'Visa Types', path: '/dashboard/admin/visa-types' },
  { icon: FileCheck, label: 'Applications', path: '/dashboard/admin/applications' },
  { icon: Users, label: 'Users', path: '/dashboard/admin/users' },
  { icon: MessageSquare, label: 'Support', path: '/dashboard/admin/support' },
  { icon: CreditCard, label: 'Payments', path: '/dashboard/admin/payments' },
  { icon: BarChart2, label: 'Analytics', path: '/dashboard/admin/analytics' },
  { icon: HelpCircle, label: 'FAQs', path: '/dashboard/admin/faqs' },
  { icon: Settings, label: 'Settings', path: '/dashboard/admin/settings' }
];

export function AdminSidebar() {
  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">Admin Portal</h2>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard/admin'}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}