import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static01.nyt.com",
      },
    ],
  },
};

export default nextConfig;
