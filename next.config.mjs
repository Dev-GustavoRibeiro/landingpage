/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['http://192.168.1.101:3000'], // substitua pelo IP se mudar
  },
}

export default nextConfig
