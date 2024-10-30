import React from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert-dialog';

export const ErrorToast = ({ error, onClose }) => {
  if (!error) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
      <Alert className="bg-red-500/90 text-white border-none">
        <AlertDescription className="flex items-center gap-2">
          {error}
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
            <X size={16} />
          </button>
        </AlertDescription>
      </Alert>
    </div>
  );
};