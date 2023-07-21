import MediaService from '../../services/media'
import { TQueryResolvers, TMutationResolvers } from '@photon/schema'
import { GraphQLError } from 'graphql/error'
import { Prisma } from '@prisma/client'
import AlbumsService from '../../services/albums'
import { v2 } from '@google-cloud/translate'
import { getEnv } from '@photon/web/env'

const queries: Partial<TQueryResolvers> = {
    media: async (_, input, context) => {
        const env = getEnv()

        const conditions: Prisma.MediumWhereInput = {
            owner: {
                id: context.user.id
            }
        }

        if (input.favorites) {
            conditions.favoredBy = {
                some: {
                    id: context.user.id
                }
            }
        }

        if (input.status) {
            conditions.status = input.status
        }

        if (input.q) {
            const translate = new v2.Translate({
                key: env.GCC_TRANSLATE_KEY
            })
            const [translated] = await translate.translate(input.q, {
                to: 'en',
                from: 'de'
            })

            conditions.AND = translated.split(' ').filter((s) => s !== '').map((word) => {
                return {
                    tags: {
                        some: {
                            label: {
                                mode: 'insensitive',
                                search: word
                            }
                        }
                    }
                }
            })
        }

        if (input.album) {
            const result = await new AlbumsService().readOne(input.album, conditions)
            return result?.media || []
        }

        return new MediaService(context).readMany({
            conditions,
            orderBy: input.sort === 'recent' ? {
                dateCreated: 'desc'
            } : {
                dateTaken: input.sort === 'newest' ? 'desc' : 'asc'
            }
        })
    },
    medium: async (_, input, context) => await new MediaService(context).readOne(input.id),
    mediaCountByYear: async (_, input, context) => {
        return await new MediaService(context).countByYear({
            owner: {
                id: context.user.id
            }
        })
    },
    download: async (_, input, context) => await new MediaService(context).download(input.media)
}

const mutations: Partial<TMutationResolvers> = {
    emptyTrash: async (_, input, context) => {
        const service = new MediaService(context)

        const media = await service.readMany({
            conditions: {
                status: 'trash'
            }
        })

        return service.destroy(media.map((medium) => medium.id as string))
    },
    upload: async (_, { files }, context) => {
        const service = new MediaService(context)
        const media = await service.writeToDisk(files)
        return service.createMany(media)
    },
    setMediaStatus: async (_, input, context) => {
        return new MediaService(context).setStatus(input.media, input.status)
    },
    rotate: async (_, input, context) => {
        const updated = await new MediaService(context).rotate(input.id)

        if (!updated) {
            throw new GraphQLError(`Could not rotate image: Image with id ${input.id} not found on database.`)
        }

        return updated
    },
    deleteMedia: async (_, input, context) => {
        return await new MediaService(context).destroy(input.ids)
    },
    updateMedium: async (_, input, context) => {
        return await new MediaService(context).update(input.id, {
            description: input.description
        })
    }
}

export default {
    queries,
    mutations
}
