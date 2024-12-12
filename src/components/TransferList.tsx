import React from 'react';
import { FileIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useTransferStore } from '../store/transferStore';

export function TransferList() {
  const transfers = useTransferStore((state) => state.transfers);

  return (
    <div className="space-y-4">
      {transfers.map((transfer) => (
        <div
          key={transfer.id}
          className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-4"
        >
          <FileIcon className="w-8 h-8 text-gray-400" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{transfer.name}</h3>
                <p className="text-sm text-gray-500">
                  {(transfer.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {transfer.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : transfer.status === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : null}
            </div>
            {transfer.status === 'uploading' && (
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${transfer.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {transfer.progress}% uploaded
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}