'use client';

import { UserProvider } from '@/lib/UserContext';
import { ToastProvider } from '@/lib/ToastContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ToastProvider>{children}</ToastProvider>
    </UserProvider>
  );
}
