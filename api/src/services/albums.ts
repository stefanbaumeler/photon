import { Knex } from 'knex'
import { Album, Medium } from '../types'
import { getDatabase } from '../database'
import AlbumsMediaService from './albumsMedia'
import { predefinedAlbumUUIDs } from '../database/helpers/ids'

export default class AlbumsService {
    knex: Knex

    tableName = 'albums'

    constructor () {
        this.knex = getDatabase()
    }

    createOne = (album: Partial<Album>, media?: Pick<Medium, 'id'>[]) => new Promise((resolve) => {
        if (media?.length) {
            album.idMedium = media[0].id
        }

        this.knex.insert(album)
            .into(this.tableName)
            .returning<{ id: string | number }[]>('id')
            .then((result) => result[0].id)
            .then((result) => {
                if (media) {
                    const albumsMediaService = new AlbumsMediaService()

                    const albumsMedia = media.map((medium) => ({
                        idMedium: medium.id,
                        idAlbum: result
                    }))

                    albumsMediaService.createMany(albumsMedia).then(() => {
                        resolve(result)
                    })
                }
                else {
                    resolve(result)
                }
            })
    })

    createMany = (albums: Partial<Album>[], media?: Pick<Medium, 'id'>[]) => new Promise((resolve) => {
        const primaryKeys = albums.map((album) => this.createOne(album, media))

        Promise.all(primaryKeys).then((results) => {
            resolve(results)
        })
    })

    async readOne (id: string | number) {
        return this.knex.from(this.tableName).select().where({
            id
        })
    }

    async readMany (limit = 100) {
        return this.knex.from(this.tableName).select().limit(limit)
    }

    async update (ids: string[] | number[] | string | number, newProps: Partial<Album>) {
        delete newProps.id

        const idsToUpdate = Array.isArray(ids) ? ids : [ids]

        return this.knex.from(this.tableName).whereIn('id', idsToUpdate).update(newProps)
    }

    async destroy (keys: string[] | number[] | string | number) {
        const keysToDestroy = Array.isArray(keys) ? keys : [keys]

        return this.knex.from(this.tableName).whereIn('id', keysToDestroy).delete()
    }
}
