import type { NextConfig } from "next";

const backendUrl = process.env.INTERNAL_API_URL
  ? process.env.INTERNAL_API_URL.replace(/\/api\/?$/, "")
  : "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    cpus: 2,
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${backendUrl}/media/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "backend",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "backend",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
