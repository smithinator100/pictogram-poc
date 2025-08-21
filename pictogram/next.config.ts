import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'pictogram-poc';

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
