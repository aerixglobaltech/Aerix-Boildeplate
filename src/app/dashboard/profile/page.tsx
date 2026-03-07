// =============================================================================
// Profile Page
// =============================================================================

import type { Metadata } from 'next';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { ProfileForm } from '@/modules/dashboard/components/ProfileForm';

export const metadata: Metadata = {
  title: 'Profile',
};

export default function ProfilePage() {
  return (
    <PageWrapper title="Profile" description="View and edit your profile information.">
      <ProfileForm />
    </PageWrapper>
  );
}
