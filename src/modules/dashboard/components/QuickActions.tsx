// =============================================================================
// Quick Actions Component
// =============================================================================
// Shortcut buttons for common tasks on the dashboard.
// =============================================================================

'use client';

import Link from 'next/link';
import { UserPlus, FileText, Settings, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ROUTES } from '@/config/routes';
import { QUICK_ACTION_COLORS } from '@/constants/colors';

const actions = [
  { label: 'Add User', icon: UserPlus, href: ROUTES.USERS, color: QUICK_ACTION_COLORS.blue },
  { label: 'Reports', icon: BarChart3, href: ROUTES.DASHBOARD, color: QUICK_ACTION_COLORS.purple },
  { label: 'Documents', icon: FileText, href: ROUTES.DASHBOARD, color: QUICK_ACTION_COLORS.green },
  { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS, color: QUICK_ACTION_COLORS.amber },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-colors ${action.color}`}
          >
            <action.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
