import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock, Calendar, Info } from 'lucide-react';

interface VisaTypeCardProps {
  type: string;
  title: string;
  withInsurance?: boolean;
  duration: string;
  validity: string;
  processingTime: string;
  price: number;
  warning?: string;
}

export function VisaTypeCard({
  type,
  title,
  withInsurance,
  duration,
  validity,
  processingTime,
  price,
  warning,
}: VisaTypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors"
    >
      <div className="bg-green-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="w-5 h-5 text-green-700" />
            <h3 className="font-semibold text-green-700">{title}</h3>
          </div>
          {withInsurance && (
            <span className="text-xs text-green-700">With Covid Insurance</span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Visa Types</p>
            <p className="font-medium">{type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Stay duration</p>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-400 mr-1" />
              <p className="font-medium">{duration}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Visa validity</p>
            <p className="font-medium">{validity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Processing time</p>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-400 mr-1" />
              <p className="font-medium">{processingTime}</p>
            </div>
          </div>
        </div>

        {warning && (
          <div className="flex items-start space-x-2 bg-yellow-50 p-3 rounded-lg">
            <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-700">{warning}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Pay us</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold text-blue-600">
                ₹{price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">per adult</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-blue-600">
              <span>+₹{Math.round(price * 0.18).toLocaleString()}</span>
              <span className="text-gray-500">(Fees+Tax)</span>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Start Application
          </button>
        </div>
      </div>
    </motion.div>
  );
}