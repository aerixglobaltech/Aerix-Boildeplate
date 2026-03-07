// =============================================================================
// Settings Page
// =============================================================================

import type { Metadata } from 'next';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { SettingsForm } from '@/modules/dashboard/components/SettingsForm';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <PageWrapper title="Settings" description="Manage your application preferences and configuration.">
      <SettingsForm />
    </PageWrapper>
  );
}
