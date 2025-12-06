'use client';

import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'error', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === 'error'
    ? 'bg-[var(--color-error)]'
    : type === 'success'
    ? 'bg-[#00C853]'
    : 'bg-[var(--color-primary)]';

  const Icon = type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-slide-down">
      <div className={`${bgColor} text-white rounded-[12px] shadow-lg px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-[calc(100vw-32px)]`}>
        <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
        <span className="text-[14px] font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
