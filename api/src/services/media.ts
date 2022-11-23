import { Knex } from 'knex'
import { getDatabase } from '../database'
import sharp from 'sharp'
import { randomUUID } from 'crypto'
import fs from 'fs'
import { TMedium } from '@photon/shared'
import { DeepPartial } from '../types'

export default class MediaService {
    knex: Knex

    tableName = 'media'

    constructor () {
        this.knex = getDatabase()
    }

    async createOne (medium: DeepPartial<TMedium>) {
        return this.knex.transaction(async (trx) => {
            return trx.select().from(this.tableName).where({
                hash: medium.hash
            }).then((result) => {
                if (result.length) {
                    fs.unlinkSync(`./uploads/${medium.filenameDisk}`)
                }
                else {
                    return trx
                        .insert({
                            ...medium,
                            owner: medium.owner?.id || medium.owner,
                            uploader: medium.uploader?.id || medium.uploader,
                            meta: JSON.stringify(medium.meta)
                        })
                        .into(this.tableName)
                        .returning('id')
                        .then((result) => result[0].id).catch((err) => {
                            console.log(err)
                        })
                }
            })
        })
    }

    async createMany (media: DeepPartial<TMedium>[]) {
        const primaryKeys = media.map((medium) => this.createOne(medium))

        return await Promise.all(primaryKeys).then((results) => {
            return results
        })
    }

    async readOne (id: string) {
        const res = await this.knex.from(this.tableName).select<TMedium[]>().where({
            id
        })

        return res[0]
    }

    async readOneFromDisk (filenameDisk: string) {
        return this.knex.from(this.tableName).select<TMedium[]>().where({
            filenameDisk
        })
    }

    readMany = (conditions: Partial<TMedium> = {}, limit = 100) => new Promise<TMedium[]>((resolve) => {
        this.knex.from(this.tableName).where(conditions).select().limit(limit).then((res) => {
            resolve(res)
        })
    })

    async destroy (keys: (string | null)[] | string) {
        const keysToDestroy = Array.isArray(keys) ? keys : [keys]

        keysToDestroy.forEach((key) => {
            if (key) {
                this.readOne(key).then((medium) => {
                    fs.unlinkSync(`./uploads/${medium.filenameDisk}`)
                })
            }
        })

        return this.knex.from(this.tableName).whereIn('id', keysToDestroy).delete().returning<string[]>('id')
    }

    rotate = (id: string) => new Promise<TMedium>((resolve) => {
        const newFileName = randomUUID()

        this.readOne(id).then((medium) => {
            sharp(`./uploads/${medium.filenameDisk}`).rotate(90).toFile(`./uploads/${newFileName}`).then((row) => {
                this.update(id, {
                    meta: {
                        ...medium.meta,
                        width: row.width,
                        height: row.height
                    },
                    filenameDisk: newFileName
                }).then((response) => {
                    fs.unlinkSync(`./uploads/${medium.filenameDisk}`)
                    resolve(response[0])
                })
            })
        })
    })

    update = (ids: (string | null)[] | string, newProps: Partial<TMedium>) => new Promise<TMedium[]>((resolve) => {
        delete newProps.id

        const idsToUpdate = (Array.isArray(ids) ? ids : [ids]) as string[]

        const data = newProps.meta ? {
            ...newProps,
            meta: this.knex.jsonSet('meta', '', JSON.stringify(newProps.meta))
        } : newProps

        this.knex.from(this.tableName).whereIn('id', idsToUpdate).update(data).returning('*')
            .then((results: TMedium[]) => {
                resolve(results)
            })
    })
}
