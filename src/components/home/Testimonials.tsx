import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    text: 'VisaPort made my visa application process incredibly smooth. Their AI system accurately filled out my forms, and the support team was always there to help.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    text: 'I was amazed by how quick and efficient the whole process was. The document scanning feature saved me hours of manual work.',
    rating: 5
  },
  {
    name: 'Priya Patel',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    text: 'The tracking system kept me informed at every step. Got my visa approved within the promised timeframe. Highly recommended!',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">Real experiences from real travelers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.country}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}