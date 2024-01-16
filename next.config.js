/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pslzxeoqhmbszsgnxpqe.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ]
    }
}

module.exports = nextConfig
