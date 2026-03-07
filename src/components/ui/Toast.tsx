// =============================================================================
// Toast Notification System
// =============================================================================
// Lightweight toast notification context + component.
// Usage:
//   const { toast } = useToast();
//   toast({ title: 'Saved!', variant: 'success' });
// =============================================================================

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOAST_VARIANTS, TOAST_ICON_STYLES } from '@/constants/colors';
import { TOAST } from '@/constants/app';

// =============================================================================
// Types
// =============================================================================

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

// =============================================================================
// Context
// =============================================================================

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

// =============================================================================
// Provider
// =============================================================================

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: Omit<Toast, 'id'>) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { ...opts, id }]);
      // Auto-dismiss after configured duration
      setTimeout(() => dismiss(id), TOAST.AUTO_DISMISS_MS);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// =============================================================================
// Toast Container (renders toasts in bottom-right)
// =============================================================================

const iconMap: Record<ToastVariant, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const variantStyles: Record<ToastVariant, string> = TOAST_VARIANTS;

const iconStyles: Record<ToastVariant, string> = TOAST_ICON_STYLES;

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => {
        const Icon = iconMap[t.variant];
        return (
          <div
            key={t.id}
            className={cn(
              'flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg',
              'animate-in slide-in-from-right-full fade-in duration-300',
              variantStyles[t.variant],
            )}
            role="alert"
          >
            <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', iconStyles[t.variant])} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{t.title}</p>
              {t.description && (
                <p className="mt-1 text-xs opacity-80">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
