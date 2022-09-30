import { ApolloServer, gql } from 'apollo-server-express'
import { Express } from 'express'
import MediaService from './services/media'
import AlbumsService from './services/albums'
import AlbumsMediaService from './services/albumsMedia'

export const createApolloServer = async (app: Express) => {
    const typeDefs = gql`
        type Medium {
            dateCreated: String
            dateModified: String
            dateTaken: String
            id: ID
            filenameDisk: String
            filenameDownload: String
            title: String
            description: String
            width: Int
            height: Int
            cameraMake: String
            cameraModel: String
            flash: Int
            fNumber: Float
            iso: Int
            lat: Float
            lng: Float
        }

        type Album {
            id: ID
            title: String
            description: String
            idMedium: ID
        }

        input AlbumInput {
            id: ID
            title: String
            description: String
            idMedium: ID
        }

        type Mutation {
            deleteMedia(ids: [ID]): String
            addToAlbum(idAlbum: ID, media: [ID]): [ID]
            removeFromAlbum(idAlbum: ID, media: [ID]): [ID]
            createAlbum(album: AlbumInput, media: [ID]): ID
        }

        type Query {
            media: [Medium]
            medium(id: ID): [Medium]
            albums: [Album]
            album(id: ID): [Album]
            albumMedia(id: ID): [Medium]
            deleteMedia(ids: [ID]): String
        }
    `

    const resolvers = {
        Query: {
            media: () => new MediaService().readMany(),
            medium: (_: any, input: { id: number }) => new MediaService().readOne(input.id),
            albums: () => new AlbumsService().readMany(),
            album: async (_: any, input: { id: number }) => new AlbumsService().readOne(input.id),
            albumMedia: async (_: any, input: { id: number }) => new AlbumsMediaService().readMany(input.id)
        },
        Mutation: {
            deleteMedia: async (_: any, input: { ids: string[] }) => new MediaService().destroy(input.ids),
            addToAlbum: async (_: any, input: { idAlbum: string | number, media: (string | number)[]}) => new AlbumsMediaService().createMany(input.media.map((medium) => ({
                idAlbum: input.idAlbum,
                idMedium: medium
            }))),
            removeFromAlbum: async (_: any, input: { idAlbum: string | number, media: (string | number)[]}) => new AlbumsMediaService().destroyMany(input.media.map((medium) => ({
                idAlbum: input.idAlbum,
                idMedium: medium
            }))),
            createAlbum: async (_: any, input: { idAlbum: string | number, media: (string | number)[]}) => new AlbumsService().createOne({}, input.media.map((medium) => ({
                id: medium
            })))
        }
    }

    const apollo = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apollo.start()

    apollo.applyMiddleware({
        app
    })

    return apollo
}
