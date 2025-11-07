import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Enable Turbopack for faster builds (Next.js 16 feature)
  experimental: {
    turbo: {},
  },
}

export default nextConfig
