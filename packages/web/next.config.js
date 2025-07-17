/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@can-i-walk-my-dog-today/shared'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Configure Edge Runtime for API routes
  serverRuntimeConfig: {
    runtime: 'edge',
  }
}

module.exports = nextConfig