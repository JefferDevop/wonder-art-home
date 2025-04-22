const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  sw: 'sw.js',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
    ],

  },
}

module.exports = withPWA(nextConfig)


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };

// module.exports = nextConfig;