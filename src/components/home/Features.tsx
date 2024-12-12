import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, Award, Users } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Quick Processing',
    description: 'Get your visa processed in as little as 24 hours',
  },
  {
    icon: Shield,
    title: '100% Secure',
    description: 'Your data is protected with bank-grade security',
  },
  {
    icon: Award,
    title: 'Expert Support',
    description: '24/7 assistance from visa experts',
  },
  {
    icon: Users,
    title: 'Trusted by Millions',
    description: '4.8/5 rating from 100,000+ travelers',
  },
];

export function Features() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose VisaPort</h2>
          <p className="mt-4 text-lg text-gray-600">
            We make visa applications simple, fast, and reliable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}