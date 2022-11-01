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

    async createOne (medium: Partial<Medium>) {
        return this.knex.transaction(async (trx) => {
            return trx.select().from(this.tableName).where({
                hash: medium.hash
            }).then((result) => {
                if (result.length) {
                    fs.unlinkSync(`./uploads/${medium.filenameDisk}`)
                }
                else {
                    return trx
                        .insert(medium)
                        .into(this.tableName)
                        .returning('id')
                        .then((result) => result[0].id)
                }
            })
        })
    }

    async createMany (media: Partial<Medium>[]) {
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

    async readMany (conditions: Partial<Medium> = {}, limit = 100): Promise<Medium[]> {
        return this.knex.from(this.tableName).where(conditions).select().limit(limit)
    }

    async destroy (keys: string[] | number[] | string | number | (string | number)[]) {
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
            await sharp(`./uploads/${medium[0].filenameDisk}`).rotate(90).toFile(`./uploads/${newFileName}`).then(async (row) => {
                fs.unlinkSync(`./uploads/${medium[0].filenameDisk}`)

                await this.update(key, {
                    width: row.width,
                    height: row.height,
                    filenameDisk: newFileName
                })
            })
        })
    }

    async update (ids: string[] | number[] | string | number, newProps: Partial<Medium>) {
        delete newProps.id

        const idsToUpdate = Array.isArray(ids) ? ids : [ids]

        return await this.knex.from(this.tableName).whereIn('id', idsToUpdate).update(newProps).returning('id')
            .then((results) => results.map((result) => result.id))
    }
}
