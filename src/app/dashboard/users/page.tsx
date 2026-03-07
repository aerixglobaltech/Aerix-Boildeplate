// =============================================================================
// Users Page
// =============================================================================

import type { Metadata } from 'next';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { UsersList } from '@/modules/users/components/UsersList';

export const metadata: Metadata = {
  title: 'Users',
};

export default function UsersPage() {
  return (
    <PageWrapper
      title="Users"
      description="Manage platform users and their permissions."
      actions={<Button size="sm">Add User</Button>}
    >
      <UsersList />
    </PageWrapper>
  );
}
