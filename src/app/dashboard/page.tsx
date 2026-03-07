// =============================================================================
// Dashboard Home Page
// =============================================================================

import type { Metadata } from 'next';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { DashboardStats } from '@/modules/dashboard/components/DashboardStats';
import { RecentActivity } from '@/modules/dashboard/components/RecentActivity';
import { QuickActions } from '@/modules/dashboard/components/QuickActions';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <PageWrapper
      title="Dashboard"
      description="Welcome back! Here's an overview of your platform."
    >
      <DashboardStats />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </PageWrapper>
  );
}
