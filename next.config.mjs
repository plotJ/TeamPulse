/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add case-sensitive paths plugin
    config.resolve = config.resolve || {};
    config.resolve.symlinks = false;
    
    // Improve module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    // Handle case-sensitivity
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': config.resolve.alias['@'] || process.cwd(),
    };

    // Ignore specific warnings
    config.ignoreWarnings = [
      { module: /next\/dist\/compiled/ },
      { module: /node_modules/ },
    ];

    return config;
  },
  // Suppress hydration warnings in development
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure consistent paths
  experimental: {
    caseSensitiveRoutes: true,
  },
};

export default nextConfig;
