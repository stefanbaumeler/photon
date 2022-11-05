import { Knex } from 'knex'
import { ImageMeta, Medium, VideoMeta } from '../types'
import { getDatabase } from '../database'
import sharp from 'sharp'
import { randomUUID } from 'crypto'
import fs from 'fs'

const objectifyMeta = <T>(jsonMedium: T & Medium<unknown>[] | T & Medium<unknown>) => {
    const jsonMedia = Array.isArray(jsonMedium) ? jsonMedium : [jsonMedium]

    const res = jsonMedia.map((json) => {
        const m = json.meta as string || ''
        const meta = (typeof m === 'object' ? m : JSON.parse(m)) as ImageMeta | VideoMeta

        meta.__typename = json.mimetype.startsWith('image') ? 'ImageMeta' : 'VideoMeta'

        return {
            ...json,
            meta
        } as Medium
    })

    return res as unknown as T
}

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
                    const meta = medium.meta

                    delete medium.meta

                    return trx
                        .insert({
                            ...medium,
                            meta: JSON.stringify(meta)
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

    async createMany (media: Partial<Medium>[]) {
        const primaryKeys = media.map((medium) => this.createOne(medium))

        return await Promise.all(primaryKeys).then((results) => {
            return results
        })
    }

    async readOne (id: string | number) {
        const res = await this.knex.from(this.tableName).select<Medium[]>().where({
            id
        })

        return objectifyMeta(res)
    }

    async readOneFromDisk (filenameDisk: string | number) {
        return this.knex.from(this.tableName).select<Medium[]>().where({
            filenameDisk
        })
    }

    async readMany (conditions: Partial<Medium> = {}, limit = 100): Promise<Medium[]> {
        const res = await this.knex.from(this.tableName).where(conditions).select().limit(limit)

        return objectifyMeta(res)
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

    async rotate (id: string | number) {
        const newFileName = randomUUID()

        await this.readOne(id).then(async (medium) => {
            await sharp(`./uploads/${medium[0].filenameDisk}`).rotate(90).toFile(`./uploads/${newFileName}`).then(async (row) => {
                await this.update(id, {
                    meta: {
                        ...medium[0].meta,
                        width: row.width,
                        height: row.height
                    },
                    filenameDisk: newFileName
                }).then(() => {
                    fs.unlinkSync(`./uploads/${medium[0].filenameDisk}`)
                })
            })
        })
    }

    async update (ids: string[] | number[] | string | number, newProps: Partial<Medium>) {
        delete newProps.id

        const idsToUpdate = Array.isArray(ids) ? ids : [ids]

        const meta = newProps.meta

        delete newProps.meta

        const data = meta ? {
            ...newProps,
            meta: this.knex.jsonSet('meta', '', JSON.stringify(meta))
        } : newProps

        return await this.knex.from(this.tableName).whereIn('id', idsToUpdate).update(data).returning('id')
            .then((results) => results.map((result) => result.id))
    }
}
