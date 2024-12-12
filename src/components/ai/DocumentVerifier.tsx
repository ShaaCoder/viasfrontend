import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, AlertCircle, CheckCircle, Camera } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export function DocumentVerifier() {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    setVerificationStatus('verifying');
    
    // Simulate AI verification process
    setTimeout(() => {
      const mockFeedback = [
        'Passport photo meets requirements',
        'Signature is clearly visible',
        'Document is not expired',
        'All required fields are present'
      ];
      setFeedback(mockFeedback);
      setVerificationStatus('success');
    }, 2000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold mb-2">AI Document Verification</h3>
      <p className="text-gray-600 mb-6">
        Our AI will verify your documents meet embassy requirements
      </p>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        <FileCheck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">Drop your documents here or click to upload</p>
        <p className="text-sm text-gray-500 mt-2">Supports PDF, JPG, PNG</p>
      </div>

      {verificationStatus === 'verifying' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-blue-50 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <div className="animate-spin">
              <Camera className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-blue-600">Verifying document...</span>
          </div>
        </motion.div>
      )}

      {verificationStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-4"
        >
          <div className="p-4 bg-green-50 rounded-lg flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Document Verified</h4>
              <p className="text-sm text-green-600">All requirements met</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Verification Results:</h4>
            <ul className="space-y-2">
              {feedback.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}