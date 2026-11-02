// Static export: `next build` writes plain files to out/, so the site can move to any host.
// This rules out server features (middleware, config redirects, automatic image resizing).
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
