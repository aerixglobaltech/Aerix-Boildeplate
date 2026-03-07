// =============================================================================
// Color Constants
// =============================================================================
// Centralized Tailwind color tokens for the entire application.
// Change brand colors here — all components inherit automatically.
//
// Usage: import { COLORS, STATUS_COLORS, BUTTON_VARIANTS } from '@/constants/colors';
// =============================================================================

// =============================================================================
// Brand / Semantic Color Tokens
// =============================================================================

export const COLORS = {
  /** Primary brand color (buttons, links, active states) */
  primary: {
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
    bgLight: 'bg-blue-50',
    bgLightHover: 'hover:bg-blue-100',
    text: 'text-blue-600',
    textHover: 'hover:text-blue-500',
    textDark: 'text-blue-700',
    textOnPrimary: 'text-white',
    border: 'border-blue-500',
    ring: 'focus-visible:ring-blue-500',
    focusBorder: 'focus:border-blue-500',
    focusRing: 'focus:ring-blue-200',
    ringOffset: 'focus:ring-1 focus:ring-blue-500',
  },

  /** Danger / destructive actions */
  danger: {
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-700',
    bgLight: 'bg-red-50',
    bgLightHover: 'hover:bg-red-50',
    bgBadge: 'bg-red-100',
    text: 'text-red-600',
    textHover: 'hover:text-red-700',
    textDark: 'text-red-700',
    textHeading: 'text-red-800',
    textSurface: 'text-red-900',
    border: 'border-red-200',
    borderInput: 'border-red-300',
    ring: 'focus-visible:ring-red-500',
    focusBorder: 'focus:border-red-500',
    focusRing: 'focus:ring-red-200',
    dot: 'bg-red-500',
  },

  /** Success states */
  success: {
    bgLight: 'bg-green-50',
    bgBadge: 'bg-green-100',
    text: 'text-green-600',
    textIcon: 'text-green-500',
    textDark: 'text-green-700',
    textHeading: 'text-green-800',
    border: 'border-green-200',
  },

  /** Warning states */
  warning: {
    bgLight: 'bg-amber-50',
    bgBadge: 'bg-amber-100',
    text: 'text-amber-600',
    textIcon: 'text-amber-500',
    textDark: 'text-amber-700',
    textHeading: 'text-amber-800',
    border: 'border-amber-200',
  },

  /** Informational states */
  info: {
    bgLight: 'bg-blue-50',
    bgBadge: 'bg-blue-100',
    text: 'text-blue-600',
    textIcon: 'text-blue-500',
    textDark: 'text-blue-700',
    textHeading: 'text-blue-800',
    border: 'border-blue-200',
  },

  /** Purple accent (used for deploy badges, reports, etc.) */
  accent: {
    bgLight: 'bg-purple-50',
    bgLightHover: 'hover:bg-purple-100',
    bgBadge: 'bg-purple-100',
    text: 'text-purple-600',
    textDark: 'text-purple-700',
  },

  /** Neutral / gray palette */
  neutral: {
    bg: 'bg-gray-100',
    bgHover: 'hover:bg-gray-100',
    bgSubtle: 'bg-gray-50',
    bgSubtleHover: 'hover:bg-gray-50',
    bgPage: 'bg-gray-50',
    bgSkeleton: 'bg-gray-200',
    text: 'text-gray-700',
    textDark: 'text-gray-900',
    textMuted: 'text-gray-500',
    textLight: 'text-gray-600',
    textFaint: 'text-gray-400',
    textPlaceholder: 'text-gray-200',
    border: 'border-gray-200',
    borderInput: 'border-gray-300',
    ring: 'focus-visible:ring-gray-500',
  },
} as const;

// =============================================================================
// Button Variant Styles
// =============================================================================

export const BUTTON_VARIANTS = {
  primary: `${COLORS.primary.bg} ${COLORS.primary.textOnPrimary} ${COLORS.primary.bgHover} ${COLORS.primary.ring} shadow-sm`,
  secondary: `${COLORS.neutral.bg} ${COLORS.neutral.textDark} ${COLORS.neutral.bgHover.replace('hover:bg', 'hover:bg')} focus-visible:ring-gray-500`,
  danger: `${COLORS.danger.bg} ${COLORS.primary.textOnPrimary} ${COLORS.danger.bgHover} ${COLORS.danger.ring} shadow-sm`,
  ghost: `${COLORS.neutral.text} ${COLORS.neutral.bgHover} ${COLORS.neutral.ring}`,
  outline: `border ${COLORS.neutral.borderInput} bg-white ${COLORS.neutral.text} ${COLORS.neutral.bgSubtleHover} ${COLORS.neutral.ring} shadow-sm`,
} as const;

// =============================================================================
// Status Badge Styles (for active/inactive, online/offline, etc.)
// =============================================================================

export const STATUS_BADGE = {
  active: `${COLORS.success.bgBadge} ${COLORS.success.textDark}`,
  inactive: `${COLORS.neutral.bg} ${COLORS.neutral.text}`,
  pending: `${COLORS.warning.bgBadge} ${COLORS.warning.textDark}`,
  error: `${COLORS.danger.bgBadge} ${COLORS.danger.textDark}`,
} as const;

// =============================================================================
// Toast Variant Styles
// =============================================================================

export const TOAST_VARIANTS = {
  success: `${COLORS.success.border} ${COLORS.success.bgLight} ${COLORS.success.textHeading}`,
  error: `${COLORS.danger.border} ${COLORS.danger.bgLight} ${COLORS.danger.textHeading}`,
  warning: `${COLORS.warning.border} ${COLORS.warning.bgLight} ${COLORS.warning.textHeading}`,
  info: `${COLORS.info.border} ${COLORS.info.bgLight} ${COLORS.info.textHeading}`,
} as const;

export const TOAST_ICON_STYLES = {
  success: COLORS.success.textIcon,
  error: COLORS.danger.text,
  warning: COLORS.warning.textIcon,
  info: COLORS.info.textIcon,
} as const;

// =============================================================================
// Input Styles
// =============================================================================

export const INPUT_STYLES = {
  error: `${COLORS.danger.borderInput} ${COLORS.danger.textSurface} ${COLORS.danger.focusBorder} ${COLORS.danger.focusRing}`,
  default: `${COLORS.neutral.borderInput} ${COLORS.neutral.textDark} ${COLORS.primary.focusBorder} ${COLORS.primary.focusRing}`,
  errorText: COLORS.danger.text,
} as const;

// =============================================================================
// Nav / Sidebar Active Styles
// =============================================================================

export const NAV_ACTIVE_STYLES = {
  active: `${COLORS.primary.bgLight} ${COLORS.primary.textDark}`,
  inactive: `${COLORS.neutral.textLight} ${COLORS.neutral.bgSubtleHover} hover:text-gray-900`,
} as const;

export const NAV_LOGOUT_STYLES = `${COLORS.neutral.textLight} ${COLORS.danger.bgLightHover} ${COLORS.danger.textHover} transition-colors`;

// =============================================================================
// Activity Action Colors (for dashboard feeds)
// =============================================================================

export const ACTION_COLORS: Record<string, string> = {
  created: `${COLORS.success.bgBadge} ${COLORS.success.textDark}`,
  updated: `${COLORS.info.bgBadge} ${COLORS.info.textDark}`,
  deleted: `${COLORS.danger.bgBadge} ${COLORS.danger.textDark}`,
  deployed: `${COLORS.accent.bgBadge} ${COLORS.accent.textDark}`,
  'commented on': `${COLORS.warning.bgBadge} ${COLORS.warning.textDark}`,
};

// =============================================================================
// Quick Action Card Colors
// =============================================================================

export const QUICK_ACTION_COLORS = {
  blue: `${COLORS.primary.bgLight} ${COLORS.primary.text} ${COLORS.primary.bgLightHover}`,
  purple: `${COLORS.accent.bgLight} ${COLORS.accent.text} ${COLORS.accent.bgLightHover}`,
  green: `${COLORS.success.bgLight} ${COLORS.success.text} hover:bg-green-100`,
  amber: `${COLORS.warning.bgLight} ${COLORS.warning.text} hover:bg-amber-100`,
} as const;

// =============================================================================
// Notification Toggle Styles
// =============================================================================

export const TOGGLE_STYLES = {
  on: COLORS.primary.bg,
  off: 'bg-gray-300',
} as const;

// =============================================================================
// Selection Card Styles (theme/density pickers in settings)
// =============================================================================

export const SELECTION_CARD = {
  selected: `${COLORS.primary.border} ${COLORS.primary.bgLight} ${COLORS.primary.textDark}`,
  unselected: `${COLORS.neutral.border} ${COLORS.neutral.textLight} hover:border-gray-300`,
} as const;

// =============================================================================
// Alert / Banner Styles
// =============================================================================

export const ALERT_STYLES = {
  error: `${COLORS.danger.border} ${COLORS.danger.bgLight} ${COLORS.danger.textDark}`,
  warning: `${COLORS.warning.border} ${COLORS.warning.bgLight} ${COLORS.warning.textDark}`,
  success: `${COLORS.success.border} ${COLORS.success.bgLight} ${COLORS.success.textDark}`,
  info: `${COLORS.info.border} ${COLORS.info.bgLight} ${COLORS.info.textDark}`,
} as const;
