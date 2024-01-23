/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    serverRuntimeConfig: {
        secret: 'This is my farm'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'https://localhost:7017/api' // development api
            : 'http://localhost:5130/api' // production api
    }
}

module.exports = nextConfig