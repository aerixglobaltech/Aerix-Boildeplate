// =============================================================================
// Navigation Constants
// =============================================================================
// Centralized navigation items used by Sidebar, MobileSidebar, and Breadcrumbs.
// Import icons from lucide-react alongside these definitions.
// =============================================================================

import {
  LayoutDashboard,
  Users,
  Settings,
  User,
} from 'lucide-react';

import { ROUTES } from '@/config/routes';

import type { LucideIcon } from 'lucide-react';

// =============================================================================
// Types
// =============================================================================

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// =============================================================================
// Main Navigation (sidebar primary links)
// =============================================================================

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Users', href: ROUTES.USERS, icon: Users },
  { label: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
];

// =============================================================================
// Bottom Navigation (sidebar footer links)
// =============================================================================

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: 'Profile', href: ROUTES.PROFILE, icon: User },
];

// =============================================================================
// Mobile Navigation (all links combined for mobile drawer)
// =============================================================================

export const MOBILE_NAV_ITEMS: NavItem[] = [
  ...MAIN_NAV_ITEMS,
  ...BOTTOM_NAV_ITEMS,
];
