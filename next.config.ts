/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⬇️  coupe totalement ESLint lors du `next build`
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
