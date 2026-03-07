// =============================================================================
// Application Providers
// =============================================================================
// Composes all providers into a single wrapper component.
// This keeps the root layout clean and makes provider management centralized.
// =============================================================================

'use client';

import { AuthProvider } from './AuthProvider';
import { QueryProvider } from './QueryProvider';
import { ToastProvider } from '@/components/ui/Toast';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <QueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
