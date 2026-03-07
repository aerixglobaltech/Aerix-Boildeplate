// =============================================================================
// NextAuth Configuration
// =============================================================================
// Central authentication configuration using NextAuth v5.
// SSO providers are prepared but commented out — enable them by:
// 1. Setting the provider environment variables in .env.local
// 2. Uncommenting the provider in the providers array below
// =============================================================================

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// Uncomment providers as needed:
// import Google from 'next-auth/providers/google';
// import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';

import { ROUTES } from '@/config/routes';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: ROUTES.LOGIN,
    error: ROUTES.LOGIN,
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  providers: [
    // =========================================================================
    // Credentials Provider (Email/Password)
    // =========================================================================
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // =====================================================================
        // IMPORTANT: Replace this with your actual API authentication call.
        // This mock implementation is for development only.
        // =====================================================================
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        // TODO: Replace with actual API call
        // Example:
        // const response = await authService.login({ email, password });
        // return response.user;

        // Mock user for development
        if (email === 'admin@company.com' && password === 'password') {
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@company.com',
            image: null,
          };
        }

        return null;
      },
    }),

    // =========================================================================
    // Google SSO (uncomment and configure AUTH_GOOGLE_ID/SECRET in .env)
    // =========================================================================
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID!,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    // }),

    // =========================================================================
    // Microsoft Azure AD / Entra ID (uncomment and configure in .env)
    // =========================================================================
    // MicrosoftEntraID({
    //   clientId: process.env.AUTH_AZURE_AD_CLIENT_ID!,
    //   clientSecret: process.env.AUTH_AZURE_AD_CLIENT_SECRET!,
    //   tenantId: process.env.AUTH_AZURE_AD_TENANT_ID!,
    // }),

    // =========================================================================
    // Okta (uncomment and configure AUTH_OKTA_* in .env)
    // =========================================================================
    // Okta({
    //   clientId: process.env.AUTH_OKTA_CLIENT_ID!,
    //   clientSecret: process.env.AUTH_OKTA_CLIENT_SECRET!,
    //   issuer: process.env.AUTH_OKTA_ISSUER!,
    // }),

    // =========================================================================
    // Auth0 (uncomment and configure AUTH_AUTH0_* in .env)
    // =========================================================================
    // Auth0({
    //   clientId: process.env.AUTH_AUTH0_CLIENT_ID!,
    //   clientSecret: process.env.AUTH_AUTH0_CLIENT_SECRET!,
    //   issuer: process.env.AUTH_AUTH0_ISSUER!,
    // }),
  ],

  callbacks: {
    /**
     * JWT callback: Persist user data in the JWT token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // Add custom fields from your user model:
        // token.role = user.role;
        // token.accessToken = user.accessToken;
      }
      return token;
    },

    /**
     * Session callback: Make JWT data available in the session.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // Attach custom fields:
        // (session.user as any).role = token.role;
      }
      return session;
    },

    /**
     * Authorized callback: Used by middleware for route protection.
     */
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAuthPage =
        nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/sso');

      // Redirect authenticated users away from auth pages
      if (isOnAuthPage && isLoggedIn) {
        return Response.redirect(new URL(ROUTES.DASHBOARD, nextUrl));
      }

      // Protect dashboard routes
      if (isOnDashboard && !isLoggedIn) {
        return false; // Redirects to signIn page
      }

      return true;
    },
  },
});
