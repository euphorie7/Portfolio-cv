import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // 👈 coupe ESLint en prod
  },
};

export default nextConfig;
