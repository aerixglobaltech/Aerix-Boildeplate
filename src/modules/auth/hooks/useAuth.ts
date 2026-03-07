// =============================================================================
// Auth Hook
// =============================================================================
// Provides a unified interface for authentication actions.
// Combines NextAuth session with Zustand store for optimal UX.
// =============================================================================

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';

import { useAuthStore } from '@/modules/auth/store/auth.store';
import { ROUTES } from '@/config/routes';

export function useAuth() {
  const { data: session, status } = useSession();
  const { user, logout: clearStore } = useAuthStore();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  /**
   * Sign in with email/password credentials.
   */
  const loginWithCredentials = useCallback(
    async (email: string, password: string) => {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error === 'CredentialsSignin' 
          ? 'Invalid email or password' 
          : result.error);
      }

      return result;
    },
    [],
  );

  /**
   * Sign in with an SSO provider.
   */
  const loginWithSSO = useCallback(
    (provider: 'google' | 'microsoft-entra-id' | 'okta' | 'auth0') => {
      return signIn(provider, { callbackUrl: ROUTES.DASHBOARD });
    },
    [],
  );

  /**
   * Sign out and clear all auth state.
   */
  const logout = useCallback(async () => {
    clearStore();
    await signOut({ callbackUrl: ROUTES.LOGIN });
  }, [clearStore]);

  return {
    user: session?.user ?? user,
    session,
    isLoading,
    isAuthenticated,
    loginWithCredentials,
    loginWithSSO,
    logout,
  };
}
