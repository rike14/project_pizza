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
                hostname: 'https://projectpizzabackend-rike14s-projects.vercel.app',
            },
        ],
    }
};

export default nextConfig;
