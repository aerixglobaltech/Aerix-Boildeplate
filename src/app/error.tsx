// =============================================================================
// Global Error Page
// =============================================================================
// Catches unhandled errors in the app and displays a recovery UI.
// This is the App Router's built-in error boundary for the root layout.
// =============================================================================

'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service (Sentry, DataDog, etc.)
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200">500</h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Something went wrong</h2>
        <p className="mt-2 text-sm text-gray-500">
          An unexpected error occurred. Our team has been notified.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-gray-400">Error ID: {error.digest}</p>
        )}
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
