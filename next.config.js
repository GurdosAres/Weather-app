/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds: true,
    },
    typescript:{
        ignoreBuildErrors: true,
    },
    output:"export",
    distDir:'dist',
    images:{
        unoptimized:true
    }
}
module.exports = nextConfig
