/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@protoxyz/themes',
    '@protoxyz/uploads-nextjs',
    '@protoxyz/auth-react',
    '@protoxyz/auth-nextjs',
  ],
};

module.exports = nextConfig;
