// =============================================================================
// Dashboard Layout
// =============================================================================
// Authenticated layout with sidebar navigation and top navbar.
// All pages under /dashboard share this layout.
// =============================================================================

import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar — hidden on mobile, shown on lg+ */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area — margin accounts for sidebar */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
