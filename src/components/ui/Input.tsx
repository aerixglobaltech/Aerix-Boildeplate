// =============================================================================
// Input Component
// =============================================================================
// Reusable input with label, error state, and forwardRef for React Hook Form.
// =============================================================================

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { INPUT_STYLES, COLORS } from '@/constants/colors';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'block w-full rounded-lg border px-3 py-2.5 text-sm',
            'placeholder:text-gray-400',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? INPUT_STYLES.error
              : INPUT_STYLES.default,
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className={`mt-1.5 text-xs ${INPUT_STYLES.errorText}`}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
