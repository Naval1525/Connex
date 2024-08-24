/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '20mb'
        }
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
