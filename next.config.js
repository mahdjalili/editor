/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: "canvas" }];
        return config;
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

module.exports = nextConfig;
