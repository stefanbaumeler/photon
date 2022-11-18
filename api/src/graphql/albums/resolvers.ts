import AlbumsService from '../../services/albums'
import AlbumsMediaService from '../../services/albumsMedia'

const queries = {
    albums: () => new AlbumsService().readMany(),
    album: async (_: any, input: { id: number }) => new AlbumsService().readOne(input.id),
    albumMedia: async (_: any, input: { id: number }) => new AlbumsMediaService().readMany(input.id)
}

const mutations = {
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
    },
    setAlbumCover: async (_: any, input: { idAlbum: string | number, idMedium: string | number}) => {
        return await new AlbumsService().update(input.idAlbum, {
            idMedium: input.idMedium
        })
    }
}

export default {
    queries,
    mutations
}
