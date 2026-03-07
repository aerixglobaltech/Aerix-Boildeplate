import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable strict React mode for better development experience
  reactStrictMode: true,

  // Image optimization domains (add your CDN/image domains here)
  images: {
    remotePatterns: [
      // Example: { protocol: 'https', hostname: 'cdn.yourcompany.com' },
    ],
  },

  // Environment variables validation at build time
  env: {},

  // Redirect / to dashboard for authenticated users (handled via middleware)
  // Add additional redirects as needed
  async redirects() {
    return [];
  },
};

export default nextConfig;
