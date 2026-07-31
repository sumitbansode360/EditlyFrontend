import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
};

export default nextConfig;