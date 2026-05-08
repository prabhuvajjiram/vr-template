import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@vadentalcare/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vadentalcare.com",
        pathname: "/wp-content/uploads/**"
      }
    ]
  }
};

export default nextConfig;
