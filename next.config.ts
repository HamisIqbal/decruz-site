import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS export — `next build` emits an `out/` folder that can be
  // uploaded to any static host (GoDaddy cPanel, Hostinger, etc.). The site has
  // no server runtime (no API routes or server actions), so this is lossless.
  output: "export",

  // Apache/cPanel serves folder URLs: `/about/` -> `/about/index.html`.
  trailingSlash: true,

  // The built-in image optimizer needs a Node server, which static hosts don't
  // run. Images are already pre-optimized (webp/avif), so serve them as-is.
  images: { unoptimized: true },
};

export default nextConfig;
