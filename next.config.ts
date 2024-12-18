import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during Vercel builds
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript type checks during Vercel builds
  },
  // Add other config options here if needed
};

export default nextConfig;
