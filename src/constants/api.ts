// =============================================================================
// API Constants
// =============================================================================
// Centralized API endpoints, headers, and status codes.
// =============================================================================

// =============================================================================
// API Endpoints
// =============================================================================

const BASE = '/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${BASE}/auth/login`,
    LOGOUT: `${BASE}/auth/logout`,
    REFRESH: `${BASE}/auth/refresh`,
    ME: `${BASE}/auth/me`,
    REGISTER: `${BASE}/auth/register`,
    FORGOT_PASSWORD: `${BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE}/auth/reset-password`,
  },

  // Users
  USERS: {
    LIST: `${BASE}/users`,
    BY_ID: (id: string) => `${BASE}/users/${id}`,
    CREATE: `${BASE}/users`,
    UPDATE: (id: string) => `${BASE}/users/${id}`,
    DELETE: (id: string) => `${BASE}/users/${id}`,
  },

  // Settings
  SETTINGS: {
    GET: `${BASE}/settings`,
    UPDATE: `${BASE}/settings`,
    NOTIFICATIONS: `${BASE}/settings/notifications`,
    APPEARANCE: `${BASE}/settings/appearance`,
  },

  // Profile
  PROFILE: {
    GET: `${BASE}/profile`,
    UPDATE: `${BASE}/profile`,
    UPLOAD_AVATAR: `${BASE}/profile/avatar`,
    CHANGE_PASSWORD: `${BASE}/profile/password`,
    DELETE_ACCOUNT: `${BASE}/profile`,
  },

  // Dashboard
  DASHBOARD: {
    STATS: `${BASE}/dashboard/stats`,
    ACTIVITY: `${BASE}/dashboard/activity`,
  },
} as const;

// =============================================================================
// HTTP Status Codes
// =============================================================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// =============================================================================
// Request Config
// =============================================================================

export const API_CONFIG = {
  TIMEOUT_MS: 30_000,
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,
} as const;

// =============================================================================
// HTTP Headers
// =============================================================================

export const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  X_REQUEST_ID: 'X-Request-Id',
} as const;

// =============================================================================
// Query Keys (TanStack React Query)
// =============================================================================

export const QUERY_KEYS = {
  USERS: ['users'] as const,
  USER: (id: string) => ['users', id] as const,
  DASHBOARD_STATS: ['dashboard', 'stats'] as const,
  DASHBOARD_ACTIVITY: ['dashboard', 'activity'] as const,
  SETTINGS: ['settings'] as const,
  PROFILE: ['profile'] as const,
} as const;
