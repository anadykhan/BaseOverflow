import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next Image doesnot support third pary app image links, so have to add it externally
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "", // Leave empty for default ports (80 for HTTP, 443 for HTTPS)
        pathname: "/**", // Match all paths under img.clerk.com
      },
    ],
  },
};

export default nextConfig;
