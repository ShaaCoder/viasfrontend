import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  documentName: string;
  isUploaded?: boolean;
}

export function DocumentUpload({ onUpload, documentName, isUploaded }: DocumentUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  if (isUploaded) {
    return (
      <div className="border rounded-lg p-4 bg-green-50 flex items-center space-x-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="text-green-700">{documentName} uploaded successfully</span>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
      <p className="text-sm text-gray-600">
        {isDragActive
          ? 'Drop your document here'
          : `Upload your ${documentName}`}
      </p>
      <p className="text-xs text-gray-500 mt-1">PDF, PNG or JPG</p>
    </div>
  );
}