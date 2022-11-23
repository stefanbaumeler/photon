import AlbumsService from '../../services/albums'
import AlbumsMediaService from '../../services/albumsMedia'
import { TQueryResolvers, TMutationResolvers } from '@photon/shared'

const queries: Partial<TQueryResolvers> = {
    albums: () => new AlbumsService().readMany(),
    album: (_, input) => new AlbumsService().readOne(input.id),
    albumMedia: (_, input) => new AlbumsMediaService().readMany(input.id)
}

const mutations: Partial<TMutationResolvers> = {
    deleteAlbum: (_, input) => {
        return new AlbumsService().destroy(input.ids)
    },
    addToAlbum: (_, input) => {
        const albumsMedia = input.media.map((medium) => ({
            idAlbum: input.idAlbum,
            idMedium: medium
        }))

        return new AlbumsMediaService().createMany(albumsMedia)
    },
    removeFromAlbum: (_, input) => {
        const itemsToRemove = input.media.map((medium) => ({
            idAlbum: input.idAlbum,
            idMedium: medium
        }))

        return new AlbumsMediaService().destroyMany(itemsToRemove).then(() => {
            return new AlbumsService().readOne(input.idAlbum)
        })
    },
    updateAlbumTitle: (_, input) => new Promise((resolve) => {
        new AlbumsService().update(input.id, {
            title: input.title
        }).then((res) => {
            resolve(res[0])
        })
    }),
    createAlbum: (_, input) => {
        const media = input.media?.map((medium) => ({
            id: medium as string
        })) || []

        return new AlbumsService().createOne({}, media)
    },
    setAlbumCover: (_, input) => new Promise((resolve) => {
        new AlbumsService().update(input.idAlbum, {
            idMedium: input.idMedium
        }).then((res) => {
            resolve(res[0])
        })
    })
}

export default {
    queries,
    mutations
}
