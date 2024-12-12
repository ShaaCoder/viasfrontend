import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from '../../components/dashboard/admin/Sidebar';
import { AdminOverview } from './admin/Overview';
import { CountriesManagement } from './admin/CountriesManagement';
import { VisaTypesManagement } from './admin/VisaTypesManagement';
import { ApplicationsManagement } from './admin/ApplicationsManagement';
import { UsersManagement } from './admin/UsersManagement';
import { SupportManagement } from './admin/SupportManagement';
import { PaymentsManagement } from './admin/PaymentsManagement';
import { AnalyticsManagement } from './admin/AnalyticsManagement';
import { FAQsManagement } from './admin/FAQsManagement';
import { SettingsManagement } from './admin/SettingsManagement';

export function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="countries" element={<CountriesManagement />} />
          <Route path="visa-types" element={<VisaTypesManagement />} />
          <Route path="applications" element={<ApplicationsManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="support" element={<SupportManagement />} />
          <Route path="payments" element={<PaymentsManagement />} />
          <Route path="analytics" element={<AnalyticsManagement />} />
          <Route path="faqs" element={<FAQsManagement />} />
          <Route path="settings" element={<SettingsManagement />} />
        </Routes>
      </div>
    </div>
  );
}