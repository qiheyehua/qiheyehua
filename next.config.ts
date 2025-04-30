import type { NextConfig } from "next";

/**
 * Next.js 配置
 * 包含 webpack 和 PostCSS 相关配置
 */
const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // 允许Sanity图片域名
  },
  // 避免对Sanity依赖进行转译
  transpilePackages: ['sanity'],
  // 实验性功能配置（如有需要可以在此添加）
  experimental: {},
  
  // webpack 配置
  webpack: (config) => {
    // 这里可以添加自定义的 webpack 配置
    return config;
  },
  
  // 禁用严格模式（如果遇到严格模式相关问题）
  // reactStrictMode: false,
};

export default nextConfig;
