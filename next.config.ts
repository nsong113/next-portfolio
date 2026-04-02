import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** AVIF/WebP 우선 — 용량 대비 체감 속도에 유리 */
    formats: ["image/avif", "image/webp"],
    /** CDN·최적화 이미지 재방문 시 재사용 (초) */
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
