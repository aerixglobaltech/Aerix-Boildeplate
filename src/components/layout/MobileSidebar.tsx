// =============================================================================
// Mobile Sidebar Overlay
// =============================================================================
// Hamburger-toggled sidebar for mobile viewports.
// =============================================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogOut,
  Menu,
  X,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { MOBILE_NAV_ITEMS } from '@/constants/navigation';
import { NAV_ACTIVE_STYLES, NAV_LOGOUT_STYLES } from '@/constants/colors';
import { APP } from '@/constants/app';

// Navigation items imported from @/constants/navigation

export function MobileSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
              <span className="text-xl font-bold text-gray-900">{APP.NAME}</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {MOBILE_NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? NAV_ACTIVE_STYLES.active
                        : NAV_ACTIVE_STYLES.inactive,
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="border-t border-gray-200 px-3 py-4">
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${NAV_LOGOUT_STYLES}`}
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
