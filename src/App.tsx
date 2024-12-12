import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { CountryGrid } from './components/home/CountryGrid';
import { Features } from './components/home/Features';
import { Stats } from './components/home/Stats';
import { Testimonials } from './components/home/Testimonials';
import { Footer } from './components/layout/Footer';
import { CountriesPage } from './pages/CountriesPage';
import { CountryDetailsPage } from './pages/CountryDetailsPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { SupportPage } from './pages/SupportPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { AgentDashboard } from './pages/dashboard/AgentDashboard';
import { UserDashboard } from './pages/dashboard/UserDashboard';
import { TrackApplicationPage } from './pages/TrackApplicationPage';
import { CareersPage } from './pages/CareersPage';
import { JobDetailsPage } from './pages/jobs/JobDetailsPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CountryGrid />
                <Stats />
                <Features />
                <Testimonials />
              </>
            }
          />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/countries/:id" element={<CountryDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/blog" element={<BlogListingPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/track" element={<TrackApplicationPage />} />
          <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
          <Route path="/dashboard/agent" element={<AgentDashboard />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}