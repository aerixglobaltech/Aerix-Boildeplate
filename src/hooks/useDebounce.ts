// =============================================================================
// useDebounce Hook
// =============================================================================
// Debounces a value to avoid excessive re-renders or API calls.
// Commonly used with search inputs.
// =============================================================================

'use client';

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
