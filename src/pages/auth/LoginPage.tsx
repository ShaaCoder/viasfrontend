import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockUsers, useAuthStore } from '../../store/authStore';

export function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // For demo purposes, we'll use mock users
    const user = mockUsers[phone as keyof typeof mockUsers];
    if (user && otp === '123456') { // Demo OTP
      setUser(user);
      navigate(`/dashboard/${user.role}`);
    } else {
      setError('Invalid phone number or OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left side - Image Gallery */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600">
          <div className="w-full p-12 flex flex-col justify-center items-center text-white">
            <h2 className="text-3xl font-bold mb-8">500+ people like you trust</h2>
            <h3 className="text-2xl font-bold mb-12">VisaPort for their visa application</h3>
            
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
              {[
                'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
                'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
                'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
                'https://images.unsplash.com/photo-1519922639192-e73293ca430e'
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Travel destination ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-8 mt-12">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-lg font-semibold">99.3%</span>
                <span className="ml-2">Approval</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-lg font-semibold">4.4</span>
                <span className="ml-2">Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Plane className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900">Welcome to VisaPort</h1>
              <p className="mt-2 text-gray-600">Sign up/Login using your mobile number</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <div className="flex border rounded-lg overflow-hidden">
                  <div className="flex items-center px-3 bg-gray-50 border-r">
                    <img
                      src="https://flagcdn.com/in.svg"
                      alt="India"
                      className="w-5 h-4 mr-2"
                    />
                    <span className="text-gray-500">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="flex-1 px-4 py-3 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP (use 123456)"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-500">
                terms & conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}