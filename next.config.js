/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/py/:path*",
          destination: "http://localhost:5000/:path*",
        },
      ];
    }
    return [];
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
