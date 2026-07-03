import { AlertCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ApiErrorToastProps {
  message: string;
  autoClose?: boolean;
  autoCloseDuration?: number;
  onClose?: () => void;
}

export function ApiErrorToast({
  message,
  autoClose = true,
  autoCloseDuration = 5000,
  onClose,
}: ApiErrorToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 max-w-sm bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3 animate-in slide-in-from-top">
      <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-destructive">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="text-destructive hover:opacity-70 transition-opacity"
      >
        <X size={18} />
      </button>
    </div>
  );
}
