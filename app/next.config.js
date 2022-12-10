// eslint-disable-next-line @typescript-eslint/no-var-requires
const withGraphql = require('next-plugin-graphql')
const NextConfig = require('next')

module.exports = withGraphql({
    async rewrites () {
        return [
            {
                source: '/albums/:idAlbum/media/:idMedium',
                destination: '/albums/:idAlbum?idMedium=:idMedium'
            },
            {
                source: '/media/:idMedium',
                destination: '/?idMedium=:idMedium'
            },
            {
                source: '/archive/media/:idMedium',
                destination: '/archive?idMedium=:idMedium'
            },
            {
                source: '/trash/media/:idMedium',
                destination: '/trash?idMedium=:idMedium'
            }
        ]
    },
    images: {
        domains: ['localhost']
    }
})
