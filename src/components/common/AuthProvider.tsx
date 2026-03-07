// =============================================================================
// Session Provider Wrapper
// =============================================================================
// Wraps NextAuth SessionProvider as a client component.
// =============================================================================

'use client';

import { SessionProvider } from 'next-auth/react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
