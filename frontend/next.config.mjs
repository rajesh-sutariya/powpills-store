/** @type {import('next').NextConfig} */
const wpHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_WP_URL ?? 'http://localhost:8080').hostname;
  } catch {
    return 'localhost';
  }
})();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: wpHost },
      { protocol: 'https', hostname: wpHost },
    ],
  },
};

export default nextConfig;
