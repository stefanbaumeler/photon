import AlbumsService from '../../services/albums'
import AlbumsMediaService from '../../services/albumsMedia'
import { TQueryResolvers, TMutationResolvers, TAlbum } from '../../database'

const queries: Partial<TQueryResolvers> = {
    albums: (_, input, context) => {
        return new AlbumsService(context).readMany({
            owner: {
                id: context.user.id
            }
        })
    },
    album: (_, input, context) => new AlbumsService(context).readOne(input.id),
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
    updateAlbumTitle: (_, input, context) => new Promise((resolve) => {
        new AlbumsService(context).update(input.id, {
            title: input.title
        }).then((res) => {
            resolve(res)
        })
    }),
    createAlbum: async (_, input, context) => {
        const media = input.media?.map((medium) => ({
            id: medium as string
        })) || []

        return await new AlbumsService(context).createOne((input.album || {}) as TAlbum, media)
    },
    setAlbumCover: (_, input) => new Promise((resolve) => {
        new AlbumsService().update(input.idAlbum, {
            cover: {
                id: input.idMedium
            }
        }).then((res) => {
            resolve(res)
        })
    })
}

export default {
    queries,
    mutations
}
