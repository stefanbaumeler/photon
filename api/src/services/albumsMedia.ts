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
        return this.knex.transaction(async (trx) => {
            return trx.insert(albumMedium)
                .into(this.tableName)
                .returning('id')
                .then((result) => result[0].id)
        })
    }

    async createMany (albumsMedia: Omit<AlbumsMedia, 'id'>[]) {
        const primaryKeys = []

        for (const albumMedium of albumsMedia) {
            const pk = await this.createOne(albumMedium)
            primaryKeys.push(pk)
        }

        return primaryKeys
    }

    async readOne (key: string | number) {
        return this.knex.from(this.tableName).join('media', 'albums_media.id_medium', 'media.id').select().where({
            id: key
        })
    }

    async readMany (idAlbum: string | number) {
        console.log(idAlbum)
        return this.knex.from(this.tableName).select().where({
            id_album: idAlbum || null
        }).join('media', 'media.id', 'albums_media.id_medium')
    }
}
