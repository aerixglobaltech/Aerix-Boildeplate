// =============================================================================
// NextAuth API Route Handler
// =============================================================================
// Handles all /api/auth/* requests (signin, signout, callback, session, etc.)
// =============================================================================

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
