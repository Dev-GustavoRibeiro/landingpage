/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/hooks': path.resolve(__dirname, 'src/hooks')
    };
    return config;
  }
};

const path = require('path');

module.exports = nextConfig;