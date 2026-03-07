// =============================================================================
// SSO Login Page
// =============================================================================
// Landing page for SSO authentication. Displays available SSO providers
// and handles the redirect flow.
// =============================================================================

'use client';

import type { Metadata } from 'next';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { COLORS } from '@/constants/colors';

export default function SSOPage() {
  const { loginWithSSO } = useAuth();

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Single Sign-On
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in with your organization&apos;s identity provider
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={() => loginWithSSO('google')}
        >
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={() => loginWithSSO('microsoft-entra-id')}
        >
          Continue with Microsoft
        </Button>

        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={() => loginWithSSO('okta')}
        >
          Continue with Okta
        </Button>

        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={() => loginWithSSO('auth0')}
        >
          Continue with Auth0
        </Button>
      </div>

      <div className="text-center">
        <a href="/login" className={`text-sm font-medium ${COLORS.primary.text} ${COLORS.primary.textHover}`}>
          Sign in with email instead
        </a>
      </div>
    </div>
  );
}
