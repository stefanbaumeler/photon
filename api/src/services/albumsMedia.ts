import { Knex } from 'knex'
import { AlbumsMedia } from '../types'
import { getDatabase } from '../database'
import { TMedium } from '@photon/shared'

export default class AlbumsMediaService {
    knex: Knex

    tableName = 'albums_media'

    constructor () {
        this.knex = getDatabase()
    }

    createOne = (albumMedium: Omit<AlbumsMedia, 'id'>) => new Promise<TMedium>((resolve) => {
        this.knex.select().from(this.tableName).where({
            id_album: albumMedium.idAlbum,
            id_medium: albumMedium.idMedium
        }).then((results) => {
            if (results.length) {
                resolve(results[0])
                return
            }

            this.knex
                .insert(albumMedium)
                .into(this.tableName)
                .returning('*')
                .then((results) => {
                    resolve(results[0])
                })
        })
    })

    createMany = (albumsMedia: Omit<AlbumsMedia, 'id'>[]) => new Promise<TMedium[]>((resolve) => {
        const primaryKeys = albumsMedia.map((albumMedium) => this.createOne(albumMedium))

        Promise.all(primaryKeys).then((results) => {
            resolve(results)
        })
    })

    destroyOne = (albumsMedia: Omit<AlbumsMedia, 'id'> | string | number) => new Promise<string>((resolve) => {
        if (typeof albumsMedia === 'object') {
            this.knex.from(this.tableName).delete().where({
                id_album: albumsMedia.idAlbum,
                id_medium: albumsMedia.idMedium
            }).returning('id').then((res) => {
                resolve(res[0])
            })

            return
        }

        this.knex.from(this.tableName).delete().where({
            id: albumsMedia
        }).returning('id').then((res) => {
            resolve(res[0])
        })
    })

    destroyMany = (albumsMedia: (Omit<AlbumsMedia, 'id'> | string | number)[]) => new Promise<string[]>((resolve) => {
        const primaryKeys = albumsMedia.map((albumMedium) => this.destroyOne(albumMedium))

        Promise.all(primaryKeys).then((results) => {
            resolve(results)
        })
    })

    async readOne (key: string | number) {
        return this.knex.from(this.tableName).join('media', 'albums_media.id_medium', 'media.id').select().where({
            id: key
        })
    }

    readMany = (idAlbum: string | number) => new Promise<TMedium[]>((resolve) => {
        this.knex.from(this.tableName).select('media.*').where({
            id_album: idAlbum || null
        }).join('media', 'media.id', 'albums_media.id_medium').then((res) => {
            resolve(res)
        })
    })

    async readManyByMedium (idMedium: string | number) {
        return this.knex.from(this.tableName).select('media.*').where({
            id_medium: idMedium || null
        }).join('media', 'media.id', 'albums_media.id_medium')
    }
}
