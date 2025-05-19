import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // ✅ disables optimization — allows any image
  },
};
export default nextConfig;
