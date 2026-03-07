// =============================================================================
// Login Form Component
// =============================================================================
// Enterprise login form with React Hook Form + Zod validation.
// Supports credentials login and SSO provider buttons.
// =============================================================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuth } from '@/modules/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/config/routes';
import { clientEnv } from '@/config/env';
import { COLORS, ALERT_STYLES } from '@/constants/colors';

// =============================================================================
// Validation Schema
// =============================================================================

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// =============================================================================
// Component
// =============================================================================

export function LoginForm() {
  const router = useRouter();
  const { loginWithCredentials, loginWithSSO } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      await loginWithCredentials(data.email, data.password);
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
      );
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access the platform
        </p>
      </div>

      {/* Server Error */}
      {serverError && (
        <div className={`rounded-lg border p-4 text-sm ${ALERT_STYLES.error}`}>
          {serverError}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-600">Remember me</span>
          </label>
          <a href="#" className={`text-sm font-medium ${COLORS.primary.text} ${COLORS.primary.textHover}`}>
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>

      {/* SSO Section */}
      {clientEnv.ENABLE_SSO && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => loginWithSSO('google')}
              type="button"
            >
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => loginWithSSO('microsoft-entra-id')}
              type="button"
            >
              Microsoft
            </Button>
          </div>
        </>
      )}

      {/* Dev credentials hint */}
      {clientEnv.ENABLE_MOCK_API && (
        <div className={`rounded-lg border p-4 text-xs ${ALERT_STYLES.warning}`}>
          <strong>Development Mode:</strong> Use{' '}
          <code className={`rounded ${COLORS.warning.bgBadge} px-1`}>admin@company.com</code> /{' '}
          <code className={`rounded ${COLORS.warning.bgBadge} px-1`}>password</code>
        </div>
      )}
    </div>
  );
}
