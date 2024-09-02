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
                hostname: process.env.NEXT_PUBLIC_API_URL,
                port: '',
            }
        ]
    },
    env: {
        key: "NEXT_PUBLIC_API_URL"
    }
};

export default nextConfig;
