import MediaService from '../../services/media'
import { TQueryResolvers, TMutationResolvers } from '@photon/schema'
import { GraphQLError } from 'graphql/error'
import { Prisma } from '@prisma/client'
import AlbumsService from '../../services/albums'

const queries: Partial<TQueryResolvers> = {
    media: async (_, input, context) => {
        if (input.album) {
            const result = await new AlbumsService().readOne(input.album)
            return result?.media || []
        }

        const conditions: Prisma.MediumWhereInput = {
            owner: {
                id: context.user.id
            }
        }

        if (input.status) {
            conditions.status = input.status
        }

        if (input.q) {
            // conditions.generatedTags = {}
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
    }
}

export default {
    queries,
    mutations
}
