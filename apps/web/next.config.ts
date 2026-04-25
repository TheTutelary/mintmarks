import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // @ts-ignore Next.js 16.2 Turbopack asks for this explicitly in logs but types are missing
  allowedDevOrigins: ['192.168.1.76', 'localhost']
};

export default nextConfig;
