import AlbumsService from '../../services/albums'
import { TQueryResolvers, TMutationResolvers } from '@photon/schema'

const queries: Partial<TQueryResolvers> = {
    albums: async (_, input, context) => {
        return new AlbumsService(context).readMany({
            owner: {
                id: context.user.id
            },
            media: input.idMedium ? {
                every: {
                    id: input.idMedium
                }
            } : undefined
        })
    },
    album: async (_, input, context) => new AlbumsService(context).readOne(input.id),
    albumMedia: async (_, input) => {
        const result = await new AlbumsService().readOne(input.id)
        return result?.media || []
    }
}

const mutations: Partial<TMutationResolvers> = {
    deleteAlbum: (_, input, context) => {
        return new AlbumsService(context).destroy(input.ids)
    },
    addToAlbum: async (_, input) => {
        const result = await new AlbumsService().addToAlbum(input.idAlbum, input.media)

        return result.media
    },
    removeFromAlbum: async (_, input, context) => {
        await new AlbumsService().removeFromAlbum(input.idAlbum, input.media)
        return new AlbumsService(context).readOne(input.idAlbum)
    },
    updateAlbum: async (_, input, context) => {
        return new AlbumsService(context).update(input.idAlbum, {
            ...input.fields,
            id: input.fields?.id || undefined,
            cover: input.fields?.cover ? {
                connect: {
                    id: input.fields.cover
                }
            } : undefined
        })
    },
    createAlbum: async (_, input, context) => {
        const media = input.media?.map((medium) => ({
            id: medium as string
        })) || []

        return await new AlbumsService(context).createOne({
            ...input.album,
            id: input.album?.id || undefined,
            cover: input.album?.cover ? {
                connect: {
                    id: input.album.cover
                }
            } : undefined
        }, media)
    }
}

export default {
    queries,
    mutations
}
