// =============================================================================
// Error Boundary Component
// =============================================================================
// Client-side error boundary that catches rendering errors in child components.
// Provides a fallback UI and optional retry functionality.
// =============================================================================

'use client';

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants/colors';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to your error reporting service (Sentry, DataDog, etc.)
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={`flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border ${COLORS.danger.border} ${COLORS.danger.bgLight} p-8`}>
          <div className="text-center">
            <h2 className={`text-lg font-semibold ${COLORS.danger.textHeading}`}>Something went wrong</h2>
            <p className={`mt-2 text-sm ${COLORS.danger.text}`}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
          </div>
          <Button variant="danger" size="sm" onClick={this.handleReset}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
