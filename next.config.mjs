/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@tensorflow/tfjs-node'],
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
                os: false,
                crypto: false,
                stream: false,
                http: false,
                https: false,
                buffer: false,
                util: false,
                url: false,
                assert: false,
                // Add other Node.js modules as needed
            };
        }

        return config;
    },
};

export default nextConfig;
