import { ApolloServer, gql } from 'apollo-server-express'
import { Express } from 'express'
import MediaService from './services/media'
import AlbumsService from './services/albums'
import AlbumsMediaService from './services/albumsMedia'
import { GraphQLUpload } from 'graphql-upload'
import fs from 'fs'
import { randomUUID } from 'crypto'
import { Medium } from './types'
import { exifToMedium } from './helpers/exif'

export const createApolloServer = async (app: Express) => {
    const typeDefs = gql`
        scalar Upload

        type File {
            url: String
        }

        type Medium {
            dateCreated: String
            dateModified: String
            dateModifiedStatus: String
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
            status: String
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
            deleteAlbum(ids: [ID]): String
            addToAlbum(idAlbum: ID, media: [ID]): [ID]
            removeFromAlbum(idAlbum: ID, media: [ID]): [ID]
            updateAlbumTitle(id: ID, title: String): ID
            createAlbum(album: AlbumInput, media: [ID]): ID
            rotate(id: ID): ID
            setMediaStatus(media: [ID], status: String): [ID]
            upload(file: [Upload]!): [File]!
            emptyTrash: Boolean
        }

        type Query {
            media(status: String): [Medium]
            medium(id: ID): [Medium]
            albums: [Album]
            album(id: ID): [Album]
            albumMedia(id: ID): [Medium]
            deleteMedia(ids: [ID]): String
            deleteAlbum(ids: [ID]): String
        }
    `

    const resolvers = {
        Upload: GraphQLUpload,
        Query: {
            media: (_: any, input: { status: string }) => {
                return new MediaService().readMany(input.status ? {
                    status: input.status
                } : {})
            },
            medium: (_: any, input: { id: number }) => new MediaService().readOne(input.id),
            albums: () => new AlbumsService().readMany(),
            album: async (_: any, input: { id: number }) => new AlbumsService().readOne(input.id),
            albumMedia: async (_: any, input: { id: number }) => new AlbumsMediaService().readMany(input.id)
        },
        Mutation: {
            emptyTrash: async () => {
                const service = new MediaService()

                await service.readMany({
                    status: 'trash'
                }).then(async (results) => {
                    await service.destroy(results.map((result) => result.id))
                })
            },
            upload: async (_: any, { file: files }: { file: any }) => {
                const service = new MediaService()

                const writePromises = files.map((file: any) => new Promise<Partial<Medium>> ((resolve) => {
                    const name = randomUUID()
                    const pathName = `./uploads/${name}`

                    Promise.resolve(file).then(({
                        createReadStream, filename
                    }) => {
                        const writeFileToDisk = new Promise<string>((r) => {
                            const stream = createReadStream()

                            stream.pipe(fs.createWriteStream(pathName)).on('finish', () => {
                                r(filename)
                            })
                        })

                        Promise.resolve(writeFileToDisk).then((filename) => {
                            exifToMedium(pathName, name, filename).then((medium) => {
                                resolve(medium)
                            })
                        })
                    })
                }))

                await Promise.all(writePromises).then(async (data) => {
                    await service.createMany(data)
                })

                return []
            },
            setMediaStatus: async (_: any, input: { media: string[], status: string }) => {
                const res = await new MediaService().update(input.media, {
                    dateModifiedStatus: 'NOW()',
                    status: input.status
                })

                return res
            },
            rotate: (_: any, input: { id: string }) => {
                return new MediaService().rotate(input.id)
            },
            deleteMedia: async (_: any, input: { ids: string[] }) => {
                return await new MediaService().destroy(input.ids)
            },
            deleteAlbum: async (_: any, input: { ids: string[] }) => {
                return await new AlbumsService().destroy(input.ids)
            },
            addToAlbum: async (_: any, input: { idAlbum: string | number, media: (string | number)[]}) => {
                const albumsMedia = input.media.map((medium) => ({
                    idAlbum: input.idAlbum,
                    idMedium: medium
                }))

                return await new AlbumsMediaService().createMany(albumsMedia)
            },
            removeFromAlbum: async (_: any, input: { idAlbum: string | number, media: (string | number)[]}) => {
                const itemsToRemove = input.media.map((medium) => ({
                    idAlbum: input.idAlbum,
                    idMedium: medium
                }))

                return await new AlbumsMediaService().destroyMany(itemsToRemove)
            },
            updateAlbumTitle: async (_: any, input: { id: string | number, title: string}) => {
                return await new AlbumsService().update(input.id, {
                    title: input.title
                })
            },
            createAlbum: async (_: any, input: { idAlbum: string | number, media: (string | number)[]}) => {
                const media = input.media.map((medium) => ({
                    id: medium
                }))

                return await new AlbumsService().createOne({}, media)
            }
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
