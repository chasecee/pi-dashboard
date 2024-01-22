/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        // Optionally, you can include a pathname to restrict it further
        // pathname: '/path/to/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
