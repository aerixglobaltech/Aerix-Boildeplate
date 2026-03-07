// =============================================================================
// Route Configuration
// =============================================================================
// Centralized route definitions. All route paths should be defined here
// to ensure consistency across the application.
// =============================================================================

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SSO: '/sso',

  // Protected routes
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',

  // API routes
  API: {
    AUTH: '/api/auth',
  },
} as const;

/**
 * Routes that require authentication.
 * Used by middleware for route protection.
 */
export const PROTECTED_ROUTES = ['/dashboard', '/users', '/settings', '/profile'] as const;

/**
 * Routes that are only accessible to unauthenticated users.
 * Authenticated users will be redirected to DASHBOARD.
 */
export const AUTH_ROUTES = ['/login', '/sso'] as const;

/**
 * Public routes accessible by anyone.
 */
export const PUBLIC_ROUTES = ['/', '/api/auth'] as const;
