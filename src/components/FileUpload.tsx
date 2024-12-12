import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useTransferStore } from '../store/transferStore';

export function FileUpload() {
  const addTransfer = useTransferStore((state) => state.addTransfer);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      addTransfer({
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'pending',
      });
      
      // Simulate file upload
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          useTransferStore.getState().updateTransfer(file.name, {
            progress,
            status: progress === 100 ? 'completed' : 'uploading',
          });
        } else {
          clearInterval(interval);
        }
      }, 500);
    });
  }, [addTransfer]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-colors hover:border-blue-500"
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      {isDragActive ? (
        <p className="text-lg text-blue-500">Drop the files here...</p>
      ) : (
        <div>
          <p className="text-lg mb-2">Drag & drop files here</p>
          <p className="text-sm text-gray-500">or click to select files</p>
        </div>
      )}
    </div>
  );
}