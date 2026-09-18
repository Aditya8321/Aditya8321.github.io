/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Static export for GitHub Pages: no server, no API routes, no image optimizer.
// Security headers cannot be set by a static host, so the CSP lives in
// app/layout.tsx as a <meta> tag instead.
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true
  }
};

export default nextConfig;
