// =============================================================================
// Home Page — Public Landing
// =============================================================================
// Redirects authenticated users to dashboard,
// shows a simple landing for unauthenticated visitors.
// =============================================================================

import Link from 'next/link';
import { ROUTES } from '@/config/routes';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <main className="mx-auto max-w-2xl px-6 text-center">
        {/* Brand */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Enterprise Platform
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your scalable, production-ready frontend starter template for building dashboards,
            admin panels, and SaaS applications.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={ROUTES.LOGIN}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Sign in to your account
          </Link>
          <Link
            href={ROUTES.DASHBOARD}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-sm text-gray-400">
          Built with Next.js &middot; TypeScript &middot; Tailwind CSS &middot; NextAuth &middot;
          Zustand &middot; React Query
        </div>
      </main>
    </div>
  );
}
