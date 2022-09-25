import { Knex } from 'knex'
import { Album, Medium } from '../types'
import { getDatabase } from '../database'
import AlbumsMediaService from './albumsMedia'

export default class AlbumsService {
    knex: Knex

    tableName = 'albums'

    constructor () {
        this.knex = getDatabase()
    }

    async createOne (album: Omit<Album, 'id' | 'idMedium'>, media?: Medium[]) {
        return this.knex.transaction(async (trx) => {
            return trx.insert(album)
                .into(this.tableName)
                .returning<{ id: string | number }[]>('id')
                .then((result) => result[0].id)
                .then((result) => {
                    if (media) {
                        const albumsMediaService = new AlbumsMediaService()

                        albumsMediaService.createMany(media.map((medium) => ({
                            idMedium: medium.id,
                            idAlbum: result
                        })))
                    }
                })
        })
    }

    async createMany (albums: Album[]) {
        const primaryKeys = []

        for (const album of albums) {
            const pk = await this.createOne(album)
            primaryKeys.push(pk)
        }

        return primaryKeys
    }

    async readOne (key: string | number) {
        return this.knex.from(this.tableName).select().where({
            id: key
        })
    }

    async readMany (limit = 100) {
        return this.knex.from(this.tableName).select().limit(limit)
    }
}
