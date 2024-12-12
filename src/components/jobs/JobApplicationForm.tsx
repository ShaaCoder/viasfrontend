import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Upload, 
  Linkedin, 
  Calendar,
  Camera,
  FileText,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { DocumentScanner } from '../ai/DocumentScanner';

interface JobApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function JobApplicationForm({ jobTitle, onClose, onSubmit }: JobApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [scanning, setScanning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    experience: '',
    preferredDate: '',
    preferredTime: '',
    resume: null as File | null,
    coverLetter: '',
    portfolioUrl: '',
    currentCompany: '',
    noticePeriod: '',
    expectedSalary: '',
    references: [] as string[],
  });

  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [scanResult, setScanResult] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFormData(prev => ({ ...prev, resume: acceptedFiles[0] }));
      // Simulate AI parsing resume
      setTimeout(() => {
        setAiSuggestions([
          'Based on your resume, you seem to be a great fit for this role',
          'We noticed you have relevant experience in React and Node.js',
          'Your previous role at XYZ Corp aligns well with this position'
        ]);
      }, 1000);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx']
    },
    maxFiles: 1
  });

  const handleScanComplete = (text: string) => {
    // Simulate AI processing scanned text
    const extractedData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      experience: '5 years'
    };
    setScanResult(extractedData);
    setFormData(prev => ({ ...prev, ...extractedData }));
    setScanning(false);
  };

  const handleLinkedinSync = async () => {
    if (!formData.linkedinUrl) return;
    
    // Simulate AI fetching LinkedIn data
    setTimeout(() => {
      const linkedinData = {
        currentCompany: 'Tech Corp',
        experience: '5 years',
        skills: ['React', 'Node.js', 'TypeScript']
      };
      setFormData(prev => ({
        ...prev,
        currentCompany: linkedinData.currentCompany,
        experience: linkedinData.experience
      }));
      setAiSuggestions(prev => [
        ...prev,
        'Successfully synced LinkedIn profile',
        'Added your current company and experience',
        'Your skills match our requirements'
      ]);
    }, 1000);
  };

  const availableTimeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Apply for {jobTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {['Personal Info', 'Experience', 'Interview Preferences'].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step > i + 1 ? 'bg-green-500' :
                    step === i + 1 ? 'bg-blue-600' :
                    'bg-gray-200'
                  } text-white`}>
                    {step > i + 1 ? <CheckCircle className="w-6 h-6" /> : i + 1}
                  </div>
                  {i < 2 && (
                    <div className={`w-24 h-1 ${
                      step > i + 1 ? 'bg-green-500' :
                      'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Profile
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleLinkedinSync}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Linkedin className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ml-6 w-64">
                  <button
                    onClick={() => setScanning(true)}
                    className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Scan Documents
                  </button>

                  {aiSuggestions.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-700 mb-2">AI Insights</h4>
                      <ul className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-blue-600 flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer">
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Drop your resume here or click to upload</p>
                <p className="text-sm text-gray-500 mt-2">PDF, DOC, or DOCX</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Interview Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, preferredTime: time })}
                      className={`px-4 py-2 rounded-lg border ${
                        formData.preferredTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'hover:border-blue-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900"
                >
                  Back
                </button>
                <button
                  onClick={() => onSubmit(formData)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document Scanner Modal */}
      {scanning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Document Scanner</h3>
              <button
                onClick={() => setScanning(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <DocumentScanner onScanComplete={handleScanComplete} />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}