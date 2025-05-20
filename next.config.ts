/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ✅ disables optimization — allows any image
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
