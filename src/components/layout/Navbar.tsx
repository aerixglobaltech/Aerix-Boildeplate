// =============================================================================
// Navbar Component
// =============================================================================
// Top navigation bar for the dashboard layout.
// Displays page title, user info, and quick actions.
// =============================================================================

'use client';

import { Bell, Search } from 'lucide-react';

import { useAuth } from '@/modules/auth/hooks/useAuth';
import { getInitials } from '@/lib/utils';
import { MobileSidebar } from './MobileSidebar';
import { COLORS } from '@/constants/colors';

export function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Left: Mobile hamburger + Search */}
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none ${COLORS.primary.focusBorder} ${COLORS.primary.ringOffset}"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className={`absolute right-1.5 top-1.5 h-2 w-2 rounded-full ${COLORS.danger.dot}`} />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${COLORS.primary.bg} text-xs font-medium ${COLORS.primary.textOnPrimary}`}>
            {user?.name ? getInitials(user.name) : 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user?.name ?? 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email ?? ''}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
