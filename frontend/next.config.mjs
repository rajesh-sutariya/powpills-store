/** @type {import('next').NextConfig} */

// STATIC_EXPORT=1 produces a plain folder of HTML/CSS/JS (used for the
// GitHub Pages preview). Normal `npm run dev` / `npm run build` ignore it.
const isStaticExport = process.env.STATIC_EXPORT === '1';

// Set when the site is served from a sub-path, e.g. /powpills-store on GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const wpHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_WP_URL ?? 'http://localhost:8080').hostname;
  } catch {
    return 'localhost';
  }
})();

const nextConfig = {
  reactStrictMode: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
  images: isStaticExport
    ? { unoptimized: true }
    : {
        remotePatterns: [
          { protocol: 'http', hostname: wpHost },
          { protocol: 'https', hostname: wpHost },
        ],
      },
};

export default nextConfig;
