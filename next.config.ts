import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compiler: {
    ...(process.env.NODE_ENV === "production" && {
      removeConsole: {
        exclude: ["error", "info"],
      },
    }),
  },
  reactStrictMode: true,
};

export default nextConfig;
