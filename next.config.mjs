/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimize for production
    reactStrictMode: true,
    
    // Webpack configuration for sql.js (only used in production)
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          crypto: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;