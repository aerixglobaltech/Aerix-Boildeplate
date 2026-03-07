// =============================================================================
// Dashboard Stats Component
// =============================================================================
// Example dashboard component showing KPI cards with mock data.
// Replace with real data from your API via React Query hooks.
// =============================================================================

'use client';

import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants/colors';

const stats = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Revenue',
    value: '$48,290',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
  {
    title: 'Active Sessions',
    value: '1,423',
    change: '-3.1%',
    changeType: 'negative' as const,
    icon: Activity,
  },
  {
    title: 'Growth Rate',
    value: '24.5%',
    change: '+4.7%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${COLORS.primary.bgLight}`}>
              <stat.icon className={`h-6 w-6 ${COLORS.primary.text}`} />
            </div>
          </div>
          <div className="mt-4">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'positive' ? COLORS.success.text : COLORS.danger.text
              }`}
            >
              {stat.change}
            </span>
            <span className="ml-1 text-sm text-gray-500">from last month</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
