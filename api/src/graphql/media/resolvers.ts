import MediaService from '../../services/media'
import { TQueryResolvers, TMutationResolvers } from '@photon/schema'

const queries: Partial<TQueryResolvers> = {
    media: async (_, input, context) => {
        return new MediaService(context).readMany({
            conditions: input.status ? {
                status: input.status,
                owner: {
                    id: context.user.id
                }
            } : {
                owner: {
                    id: context.user.id
                }
            },
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
        return new MediaService(context).setStatus(input.media as string[], input.status)
    },
    rotate: async (_, input, context) => {
        return await new MediaService(context).rotate(input.id)
    },
    deleteMedia: async (_, input, context) => {
        return await new MediaService(context).destroy(input.ids)
    }
}

export default {
    queries,
    mutations
}
