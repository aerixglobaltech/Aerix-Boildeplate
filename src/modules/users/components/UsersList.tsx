// =============================================================================
// Users List Component
// =============================================================================
// Example component demonstrating TanStack React Query data fetching.
// Replace mock data with actual API calls when backend is connected.
// =============================================================================

'use client';

import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Loader';
import { STATUS_BADGE } from '@/constants/colors';

// Mock data for development (remove when API is connected)
const mockUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@company.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Bob Smith', email: 'bob@company.com', role: 'Manager', status: 'active' },
  { id: '3', name: 'Carol White', email: 'carol@company.com', role: 'User', status: 'inactive' },
  { id: '4', name: 'David Brown', email: 'david@company.com', role: 'User', status: 'active' },
];

export function UsersList() {
  // When API is connected, use:
  // const { data, isLoading, error } = useUsers(1, 10);
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Card noPadding>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.role}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === 'active'
                        ? STATUS_BADGE.active
                        : STATUS_BADGE.inactive
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
