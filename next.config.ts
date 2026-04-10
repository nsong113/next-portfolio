import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** AVIF/WebP 우선  */
    formats: ["image/avif", "image/webp"],
    /**Image cache time */
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
