// =============================================================================
// React Query Provider
// =============================================================================
// Wraps the application with TanStack React Query's QueryClientProvider.
// Configures global defaults for caching, retries, and stale time.
// =============================================================================

'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create client inside component to avoid shared state across requests in SSR
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Cache persists for 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry failed queries up to 2 times
            retry: 2,
            // Don't refetch on window focus in development
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
