'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-white" strokeWidth={2.5} />;
      case 'error':
        return <X className="w-5 h-5 text-white" strokeWidth={2.5} />;
      case 'info':
        return <AlertCircle className="w-5 h-5 text-white" strokeWidth={2} />;
    }
  };

  const getBgColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-[#191f28]';
      case 'error':
        return 'bg-[#f04452]';
      case 'info':
        return 'bg-[#4e5968]';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-[440px] px-5">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-[12px] shadow-lg animate-slide-up ${getBgColor(toast.type)}`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {getIcon(toast.type)}
            </div>
            <span className="text-[14px] text-white font-medium flex-1">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
