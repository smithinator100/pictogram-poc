import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'pictogram-app-2024';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
