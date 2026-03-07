// =============================================================================
// Application Constants
// =============================================================================
// General application-level constants shared across the project.
// =============================================================================

// =============================================================================
// App Metadata
// =============================================================================

export const APP = {
  NAME: 'Platform',
  DESCRIPTION: 'Enterprise Application Platform',
  VERSION: '1.0.0',
  DEFAULT_TITLE: 'Platform',
} as const;

// =============================================================================
// Pagination Defaults
// =============================================================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100] as readonly number[],
  MAX_PAGE_SIZE: 100,
} as const;

// =============================================================================
// Date / Time Formats (for Intl.DateTimeFormat or dayjs/date-fns)
// =============================================================================

export const DATE_FORMAT = {
  SHORT: 'MMM d, yyyy',           // Mar 7, 2026
  LONG: 'MMMM d, yyyy',           // March 7, 2026
  WITH_TIME: 'MMM d, yyyy h:mm a', // Mar 7, 2026 9:30 AM
  TIME_ONLY: 'h:mm a',            // 9:30 AM
  ISO: "yyyy-MM-dd'T'HH:mm:ss",
} as const;

// =============================================================================
// Layout
// =============================================================================

export const LAYOUT = {
  SIDEBAR_WIDTH: 256,             // 16rem = w-64
  SIDEBAR_COLLAPSED_WIDTH: 64,    // 4rem = w-16
  NAVBAR_HEIGHT: 64,              // 4rem = h-16
  MAX_CONTENT_WIDTH: 1280,        // 80rem = max-w-7xl
} as const;

// =============================================================================
// Toast / Notifications
// =============================================================================

export const TOAST = {
  AUTO_DISMISS_MS: 4000,
  MAX_VISIBLE: 5,
} as const;

// =============================================================================
// Debounce / Throttle
// =============================================================================

export const TIMING = {
  DEBOUNCE_MS: 300,
  THROTTLE_MS: 500,
  ANIMATION_MS: 200,
  TRANSITION_MS: 300,
} as const;

// =============================================================================
// File Upload
// =============================================================================

export const UPLOAD = {
  MAX_FILE_SIZE_MB: 10,
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024,
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as readonly string[],
  ACCEPTED_DOC_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] as readonly string[],
} as const;

// =============================================================================
// Validation Rules
// =============================================================================

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
  MAX_BIO_LENGTH: 500,
  PHONE_REGEX: /^\+?[\d\s\-()]{7,20}$/,
} as const;

// =============================================================================
// Breakpoints (matching Tailwind defaults)
// =============================================================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// =============================================================================
// Local Storage Keys
// =============================================================================

export const STORAGE_KEYS = {
  AUTH_STATE: 'auth-storage',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',
  THEME: 'theme-preference',
  LOCALE: 'locale',
} as const;
