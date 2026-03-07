// =============================================================================
// Middleware — Route Protection
// =============================================================================
// Uses NextAuth v5 middleware to protect routes.
// - Unauthenticated users accessing protected routes → redirect to /login
// - Authenticated users accessing auth pages → redirect to /dashboard
//
// Configuration is handled in lib/auth.ts via the `authorized` callback.
// =============================================================================

export { auth as middleware } from '@/lib/auth';

/**
 * Middleware matcher configuration.
 * Defines which routes the middleware should run on.
 * Excludes static files, images, and API routes that don't need protection.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder assets
     * - API auth routes (handled by NextAuth)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',
  ],
};
