import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl my-4">
      <AlertCircle size={20} className="flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;