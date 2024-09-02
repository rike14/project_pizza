/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3333',
            },
            {
                protocol: 'https',
                hostname: 'apisujeitopizza.vercel.app',
            }
        ]
    }
};

export default nextConfig;
