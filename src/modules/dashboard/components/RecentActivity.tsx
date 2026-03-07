// =============================================================================
// Recent Activity Component
// =============================================================================
// Displays recent platform activity — useful for dashboard overview.
// =============================================================================

'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { ACTION_COLORS } from '@/constants/colors';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    user: 'Alice Johnson',
    action: 'created',
    target: 'Project Alpha',
    timestamp: '2026-03-07T09:30:00Z',
  },
  {
    id: '2',
    user: 'Bob Smith',
    action: 'updated',
    target: 'User permissions',
    timestamp: '2026-03-07T08:45:00Z',
  },
  {
    id: '3',
    user: 'Carol White',
    action: 'deleted',
    target: 'Draft report Q1',
    timestamp: '2026-03-06T17:20:00Z',
  },
  {
    id: '4',
    user: 'David Brown',
    action: 'deployed',
    target: 'v2.4.1 to production',
    timestamp: '2026-03-06T15:10:00Z',
  },
  {
    id: '5',
    user: 'Eva Martinez',
    action: 'commented on',
    target: 'Feature request #142',
    timestamp: '2026-03-06T14:00:00Z',
  },
];

const actionColors: Record<string, string> = ACTION_COLORS;

export function RecentActivity() {
  return (
    <Card noPadding>
      <CardHeader className="px-6 pt-6">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <div className="divide-y divide-gray-100">
        {mockActivity.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-6 py-3.5">
            {/* User Initial */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
              {item.user.split(' ').map((n) => n[0]).join('')}
            </div>
            {/* Detail */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-gray-900">
                <span className="font-medium">{item.user}</span>{' '}
                <span
                  className={`inline-block rounded px-1.5 py-0.5 text-xs font-medium ${
                    actionColors[item.action] ?? 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {item.action}
                </span>{' '}
                {item.target}
              </p>
            </div>
            {/* Timestamp */}
            <span className="shrink-0 text-xs text-gray-400">
              {formatDate(item.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
