/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@protoxyz/themes',
    '@protoxyz/uploads-nextjs',
    '@protoxyz/uploads-react',
    '@protoxyz/auth-react',
    '@protoxyz/auth-nextjs',
    '@protoxyz/types',
    '@protoxyz/core',
  ],
};

module.exports = nextConfig;
