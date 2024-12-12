import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '1M+',
    label: 'Happy Travelers',
    description: 'Trusted by millions worldwide'
  },
  {
    icon: CheckCircle,
    value: '98%',
    label: 'Success Rate',
    description: 'Visa approval rate'
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Support',
    description: 'Round the clock assistance'
  },
  {
    icon: Globe,
    value: '190+',
    label: 'Countries',
    description: 'Global visa services'
  }
];

export function Stats() {
  return (
    <div className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-blue-100 mb-1">{stat.label}</div>
              <div className="text-sm text-blue-200">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}