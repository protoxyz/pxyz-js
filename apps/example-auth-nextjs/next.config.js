/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@protoxyz/auth-next", "@protoxyz/auth-react", "@protoxyz/themes"],
};

module.exports = nextConfig;
