/** @type {import('next').NextConfig} */

module.exports = {
  pageExtensions: ['tsx', 'ts'],
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {fs: false, net: false, tls: false}
    return config
  },
}
