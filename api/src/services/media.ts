import { Knex } from 'knex'
import { Medium } from '../types'
import { getDatabase } from '../database'
import sharp from 'sharp'
import { randomUUID } from 'crypto'
import fs from 'fs'

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

    async readMany (limit = 100): Promise<Medium[]> {
        return this.knex.from(this.tableName).select().limit(limit)
    }

    async destroy (keys: string[] | number[] | string | number) {
        const keysToDestroy = Array.isArray(keys) ? keys : [keys]

        keysToDestroy.forEach((key) => {
            this.readOne(key).then((medium) => {
                fs.unlinkSync(`./uploads/${medium[0].filenameDisk}`)
            })
        })

        return this.knex.from(this.tableName).whereIn('id', keysToDestroy).delete()
    }

    async rotate (key: string | number) {
        const newFileName = randomUUID()

        await this.readOne(key).then(async (medium) => {
            await sharp(`./uploads/${medium[0].filenameDisk}`).rotate(90).toFile(`./uploads/${newFileName}`).then(() => {
                fs.unlinkSync(`./uploads/${medium[0].filenameDisk}`)
            })

            await this.updateOne(key, {
                width: medium[0].height,
                height: medium[0].width,
                filenameDisk: newFileName
            })
        })
    }

    async updateOne (id: string | number, newProps: Partial<Medium>) {
        delete newProps.id

        return this.knex.from(this.tableName).where({
            id
        }).update(newProps)
    }
}
