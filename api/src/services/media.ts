import { Knex } from 'knex'
import { Medium } from '../types'
import { getDatabase } from '../database'
import AlbumsMediaService from './albumsMedia'

export default class MediaService {
    knex: Knex

    tableName = 'media'

    constructor () {
        this.knex = getDatabase()
    }

    async createOne (medium: Omit<Medium, 'id' | 'dateCreated' | 'dateModified'>) {
        return this.knex.transaction(async (trx) => {
            return trx.select().from(this.tableName).where({
                hash: medium.hash
            }).then((result) => {
                if (!result.length) {
                    return trx
                        .insert(medium)
                        .into(this.tableName)
                        .returning('id')
                        .then((result) => result[0].id)
                }
            })
        })
    }

    async createMany (media: Omit<Medium, 'id' | 'dateCreated' | 'dateModified'>[]) {
        const primaryKeys = media.map((medium) => this.createOne(medium))

        return await Promise.all(primaryKeys).then((results) => {
            return results
        })
    }

    async readOne (key: string | number) {
        return this.knex.from(this.tableName).select().where({
            id: key
        })
    }

    async readOneFromDisk (key: string | number) {
        return this.knex.from(this.tableName).select().where({
            filenameDisk: key
        })
    }

    async readMany (limit = 100) {
        return this.knex.from(this.tableName).select().limit(limit)
    }

    async destroy (keys: string[] | number[] | string | number) {
        const keysToDestroy = Array.isArray(keys) ? keys : [keys]

        return this.knex.from(this.tableName).whereIn('id', keysToDestroy).delete()
    }
}
