import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'somwpkzlplaovldnfahk.supabase.co',
      },
    ],
  },
};

export default nextConfig;
