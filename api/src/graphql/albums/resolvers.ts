import AlbumsService from '../../services/albums'
import AlbumsMediaService from '../../services/albumsMedia'
import { TQueryResolvers, TMutationResolvers } from '@photon/schema'

const queries: Partial<TQueryResolvers> = {
    albums: async (_, input, context) => {
        return new AlbumsService(context).readMany({
            owner: {
                id: context.user.id
            },
            albumMedia: input.idMedium ? {
                some: {
                    idMedium: input.idMedium
                }
            } : undefined
        })
    },
    album: async (_, input, context) => new AlbumsService(context).readOne(input.id),
    albumMedia: (_, input) => new AlbumsMediaService().readMediaOfAlbum(input.id)
}

const mutations: Partial<TMutationResolvers> = {
    deleteAlbum: (_, input, context) => {
        return new AlbumsService(context).destroy(input.ids)
    },
    addToAlbum: (_, input) => {
        const albumsMedia = input.media.map((medium) => ({
            idAlbum: input.idAlbum,
            idMedium: medium
        }))

        return new AlbumsMediaService().createMany(albumsMedia)
    },
    removeFromAlbum: async (_, input, context) => {
        await new AlbumsMediaService().removeFromAlbum(input.idAlbum, input.media)
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
