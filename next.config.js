/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '7245',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.narvex.id',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'narvex.id',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.narvex.id',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    // Enhanced image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize image loading
    loader: 'default',
  },
  experimental: {
    // Optimize package imports for better tree shaking
    optimizePackageImports: ['lucide-react', 'gsap', 'framer-motion'],
    // Enable partial prerendering for better performance
    ppr: false, // Set to true when stable
  },
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Performance optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable SWC minification
    styledComponents: true,
  },
  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          gsap: {
            test: /[\\/]node_modules[\\/]gsap[\\/]/,
            name: 'gsap',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    // Support JSON imports
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });

    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      // Optimize GSAP imports
      'gsap/dist/gsap': 'gsap/dist/gsap.min.js',
    };

    return config;
  },
  // Caching headers for static assets
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 1 day
          },
        ],
      },
    ];
  },
  // Optimize redirects and rewrites
  async redirects() {
    return [];
  },
  // Enable compression
  compress: true,
  // Optimize output
  output: 'standalone',
  // Power optimizations
  poweredByHeader: false,
  // Generate ETags for better caching
  generateEtags: true,
  // Optimize page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;