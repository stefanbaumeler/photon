import { Knex } from 'knex'
import { AlbumsMedia } from '../types'
import { getDatabase } from '../database'

export default class AlbumsMediaService {
    knex: Knex

    tableName = 'albums_media'

    constructor () {
        this.knex = getDatabase()
    }

    async createOne (albumMedium: Omit<AlbumsMedia, 'id'>) {
        return new Promise<string | number>((resolve) => {
            this.knex.select().from(this.tableName).where({
                id_album: albumMedium.idAlbum,
                id_medium: albumMedium.idMedium
            }).then(async (results) => {
                if (results.length) {
                    resolve(results[0].id)
                    return
                }

                this.knex
                    .insert(albumMedium)
                    .into(this.tableName)
                    .returning<{ id: string | number }>('id')
                    .then((result) => {
                        resolve(result.id)
                    })
            })
        })
    }

    async createMany (albumsMedia: Omit<AlbumsMedia, 'id'>[]) {
        const primaryKeys = albumsMedia.map((albumMedium) => this.createOne(albumMedium))

        return await Promise.all(primaryKeys).then((results) => {
            return results
        })
    }

    async destroyOne (albumsMedia: Omit<AlbumsMedia, 'id'> | string | number) {
        return new Promise<string | number>((resolve) => {
            if (typeof albumsMedia === 'object') {
                this.knex.from(this.tableName).delete().where({
                    id_album: albumsMedia.idAlbum,
                    id_medium: albumsMedia.idMedium
                }).then(() => {
                    resolve('')
                })

                return
            }

            this.knex.from(this.tableName).delete().where({
                id: albumsMedia
            }).then(() => {
                resolve('')
            })
        })
    }

    async destroyMany (albumsMedia: (Omit<AlbumsMedia, 'id'> | string | number)[]) {
        const primaryKeys = albumsMedia.map((albumMedium) => this.destroyOne(albumMedium))

        return await Promise.all(primaryKeys).then((results) => {
            return results
        })
    }

    async readOne (key: string | number) {
        return this.knex.from(this.tableName).join('media', 'albums_media.id_medium', 'media.id').select().where({
            id: key
        })
    }

    async readMany (idAlbum: string | number) {
        return this.knex.from(this.tableName).select().where({
            id_album: idAlbum || null
        }).join('media', 'media.id', 'albums_media.id_medium')
    }

    async readManyByMedium (idMedium: string | number) {
        return this.knex.from(this.tableName).select().where({
            id_medium: idMedium || null
        }).join('media', 'media.id', 'albums_media.id_medium')
    }
}
