import { Knex } from 'knex'
import { AlbumsMedia } from '../types'
import { getDatabase } from '../database'
import { objectifyMeta } from '../helpers/meta'

export default class AlbumsMediaService {
    knex: Knex

    tableName = 'albums_media'

    constructor () {
        this.knex = getDatabase()
    }

    createOne = (albumMedium: Omit<AlbumsMedia, 'id'>) => new Promise((resolve) => {
        this.knex.select().from(this.tableName).where({
            id_album: albumMedium.idAlbum,
            id_medium: albumMedium.idMedium
        }).then((results) => {
            if (results.length) {
                resolve(results[0].id)
                return
            }

            this.knex
                .insert(albumMedium)
                .into(this.tableName)
                .returning<{ id: string | number }[]>('id')
                .then((results) => {
                    resolve(results[0].id)
                })
        })
    })

    createMany = (albumsMedia: Omit<AlbumsMedia, 'id'>[]) => new Promise((resolve) => {
        const primaryKeys = albumsMedia.map((albumMedium) => this.createOne(albumMedium))

        Promise.all(primaryKeys).then((results) => {
            resolve(results)
        })
    })

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
        const res = await this.knex.from(this.tableName).join('media', 'albums_media.id_medium', 'media.id').select().where({
            id: key
        })

        return objectifyMeta(res)
    }

    async readMany (idAlbum: string | number) {
        const res = await this.knex.from(this.tableName).select('media.*').where({
            id_album: idAlbum || null
        }).join('media', 'media.id', 'albums_media.id_medium')

        return objectifyMeta(res)
    }

    async readManyByMedium (idMedium: string | number) {
        return this.knex.from(this.tableName).select('media.*').where({
            id_medium: idMedium || null
        }).join('media', 'media.id', 'albums_media.id_medium')
    }
}
