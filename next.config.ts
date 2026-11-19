import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "https://app.grupovolia.com/admin",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "https://app.grupovolia.com/admin/:path*",
        permanent: false,
      },
      {
        source: "/login",
        destination: "https://app.grupovolia.com/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
