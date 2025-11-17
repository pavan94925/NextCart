import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // New Next.js 16 features
  cacheComponents: true,   // Enables explicit component caching
  reactCompiler: true,     // Enables automatic memoization (better performance)

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
