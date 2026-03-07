// =============================================================================
// Root Layout
// =============================================================================
// Top-level layout wrapping the entire application.
// Mounts global providers (Auth, React Query) and global styles.
// =============================================================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/components/common/Providers';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Enterprise Platform',
    template: '%s | Enterprise Platform',
  },
  description: 'Enterprise SaaS platform built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
