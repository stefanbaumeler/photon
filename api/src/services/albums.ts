import { Knex } from 'knex'
import { Album } from '../types'
import { getDatabase } from '../database'

export default class AlbumsService {
    knex: Knex

    tableName = 'albums'

    constructor () {
        this.knex = getDatabase()
    }

    async createOne (album: Album) {
        return this.knex.transaction(async (trx) => {
            return trx.insert(album)
                .into(this.tableName)
                .returning('id')
                .then((result) => result[0].id)
        })
    }

    async createMany (media: Album[]) {
        const primaryKeys = []

        for (const medium of media) {
            const pk = await this.createOne(medium)
            primaryKeys.push(pk)
        }

        return primaryKeys
    }

    async readOne (key: string | number) {
        return this.knex.from(this.tableName).join('media', 'media.id', 'albums.id_media').select().where({
            id: key
        })
    }

    async readMany (limit = 100) {
        return this.knex.from(this.tableName).select().limit(limit)
    }
}
