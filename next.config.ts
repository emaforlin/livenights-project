import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "livenightimages.82e9eb3b4b7a482645465b7385c97f9f.r2.cloudflarestorage.com",
                port: "",
                pathname: "/livenightimages/**"
            }
        ]
    },
    output: "standalone"
};

export default nextConfig;
