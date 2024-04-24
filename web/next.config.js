// eslint-disable-next-line @typescript-eslint/no-var-requires
const withGraphql = require('next-plugin-graphql')

module.exports = withGraphql({
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    // eslint: {
    //     ignoreDuringBuilds: true
    // },
    images: {
        unoptimized: true
    }
})
