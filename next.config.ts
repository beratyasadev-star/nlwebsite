import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'nlwebsite.onrender.com',
        pathname: '/media/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
    minimumCacheTTL: 60,
  },
  experimental: {
    reactCompiler: false,
  },
};

export default nextConfig;
