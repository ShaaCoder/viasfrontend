import React, { useState } from 'react';
import { Camera, Upload, RefreshCw, Check } from 'lucide-react';
import Webcam from 'react-webcam';
import { createWorker } from 'tesseract.js';
import { motion, AnimatePresence } from 'framer-motion';

export function DocumentScanner() {
  const [mode, setMode] = useState<'camera' | 'upload' | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);

  const scanImage = async (imageUrl: string) => {
    setScanning(true);
    try {
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(imageUrl);
      await worker.terminate();
      setResult(text);
    } catch (error) {
      console.error('Error scanning document:', error);
    }
    setScanning(false);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      scanImage(imageSrc);
    }
  }, [webcamRef]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        scanImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold mb-4">AI Document Scanner</h3>
      <p className="text-gray-600 mb-6">
        Scan your passport or other documents to automatically fill in your visa application.
      </p>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setMode('camera')}
          className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-colors ${
            mode === 'camera' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span>Use Camera</span>
        </button>

        <button
          onClick={() => setMode('upload')}
          className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-colors ${
            mode === 'upload' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <Upload className="w-5 h-5" />
          <span>Upload Document</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'camera' && (
          <motion.div
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="relative rounded-lg overflow-hidden">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full"
              />
              <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-lg pointer-events-none" />
            </div>
            <button
              onClick={capture}
              disabled={scanning}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              {scanning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span>Capture Document</span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {mode === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">Supported formats: JPG, PNG, PDF</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
              />
            </label>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <div className="flex items-center space-x-2 text-green-700 mb-2">
              <Check className="w-5 h-5" />
              <span className="font-medium">Document scanned successfully!</span>
            </div>
            <p className="text-sm text-green-600">
              We've extracted the information and pre-filled your application.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}