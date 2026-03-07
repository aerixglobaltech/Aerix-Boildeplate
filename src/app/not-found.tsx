// =============================================================================
// 404 Not Found Page
// =============================================================================

import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { COLORS } from '@/constants/colors';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Page not found</h2>
        <p className="mt-2 text-sm text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href={ROUTES.DASHBOARD}
        className={`inline-flex h-10 items-center justify-center rounded-lg ${COLORS.primary.bg} px-6 text-sm font-medium ${COLORS.primary.textOnPrimary} transition-colors ${COLORS.primary.bgHover}`}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
