// =============================================================================
// Auth Layout
// =============================================================================
// Shared layout for authentication pages (login, SSO, etc.)
// Centered card layout with clean, minimal design.
// =============================================================================

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
