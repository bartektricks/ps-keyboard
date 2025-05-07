import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    domains: ["image.api.playstation.com"],
  },
};

export default nextConfig;
