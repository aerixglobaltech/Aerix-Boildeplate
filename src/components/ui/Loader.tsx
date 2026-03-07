// =============================================================================
// Loader Component
// =============================================================================
// Spinner and skeleton loaders for loading states.
// =============================================================================

import { cn } from '@/lib/utils';
import { COLORS } from '@/constants/colors';

// =============================================================================
// Spinner Loader
// =============================================================================

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        `animate-spin rounded-full border-2 border-gray-200 border-t-current ${COLORS.primary.text}`,
        spinnerSizes[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// =============================================================================
// Full Page Loader
// =============================================================================

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

// =============================================================================
// Skeleton Loader
// =============================================================================

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      aria-hidden="true"
    />
  );
}
