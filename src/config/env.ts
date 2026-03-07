// =============================================================================
// Environment Configuration
// =============================================================================
// Centralized environment variable access with type safety.
// All environment variables should be accessed through this module.
// =============================================================================

/**
 * Server-side environment variables (not exposed to browser).
 * Access these only in Server Components, API routes, or middleware.
 */
export const serverEnv = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,

  // SSO Provider credentials (server-only)
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  AUTH_AZURE_AD_CLIENT_ID: process.env.AUTH_AZURE_AD_CLIENT_ID,
  AUTH_AZURE_AD_CLIENT_SECRET: process.env.AUTH_AZURE_AD_CLIENT_SECRET,
  AUTH_AZURE_AD_TENANT_ID: process.env.AUTH_AZURE_AD_TENANT_ID,
  AUTH_OKTA_CLIENT_ID: process.env.AUTH_OKTA_CLIENT_ID,
  AUTH_OKTA_CLIENT_SECRET: process.env.AUTH_OKTA_CLIENT_SECRET,
  AUTH_OKTA_ISSUER: process.env.AUTH_OKTA_ISSUER,
  AUTH_AUTH0_CLIENT_ID: process.env.AUTH_AUTH0_CLIENT_ID,
  AUTH_AUTH0_CLIENT_SECRET: process.env.AUTH_AUTH0_CLIENT_SECRET,
  AUTH_AUTH0_ISSUER: process.env.AUTH_AUTH0_ISSUER,
} as const;

/**
 * Client-side environment variables (exposed to browser via NEXT_PUBLIC_ prefix).
 * Safe to use in any component.
 */
export const clientEnv = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ENABLE_SSO: process.env.NEXT_PUBLIC_ENABLE_SSO === 'true',
  ENABLE_MOCK_API: process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true',
} as const;
