import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Camera, ArrowRight, Check } from 'lucide-react';
import { DocumentScanner } from '../ai/DocumentScanner';
import { DocumentVerifier } from '../ai/DocumentVerifier';

interface Traveler {
  id: string;
  name: string;
  passport: string;
  photo: string;
  documents: string[];
}

export function VisaApplicationForm() {
  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);

  const steps = [
    { id: 1, title: 'Traveler Details' },
    { id: 2, title: 'Document Upload' },
    { id: 3, title: 'Review & Payment' },
    { id: 4, title: 'Confirmation' }
  ];

  const handleScanComplete = (text: string) => {
    // Process scanned text with AI to extract relevant information
    console.log('Scanned text:', text);
    setShowScanner(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= s.id ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {step > s.id ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{s.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-1 ${
                  step > s.id ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((s) => (
            <span key={s.id} className="text-sm text-gray-600">
              {s.title}
            </span>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Traveler Information</h2>
            <p className="text-gray-600">
              Add details for all travelers. You can use our AI scanner to automatically fill in information from passports.
            </p>
            
            {/* Add traveler form */}
            <button
              onClick={() => setShowScanner(true)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Camera className="w-5 h-5" />
              <span>Scan Passport</span>
            </button>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue to Documents</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Document Upload</h2>
            <p className="text-gray-600">
              Upload required documents. Our AI will verify if they meet embassy requirements.
            </p>

            <DocumentVerifier />

            <button
              onClick={() => setStep(3)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue to Review</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Add more steps */}
      </motion.div>

      {/* Document Scanner Modal */}
      {showScanner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Document Scanner</h3>
              <button
                onClick={() => setShowScanner(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <DocumentScanner />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}