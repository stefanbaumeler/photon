import { Knex } from 'knex'
import { getDatabase } from '../database'
import AlbumsMediaService from './albumsMedia'
import { TAlbum, TMedium } from '@photon/shared'
import { DeepPartial } from '../types'

export default class AlbumsService {
    knex: Knex

    tableName = 'albums'

    constructor () {
        this.knex = getDatabase()
    }

    createOne = (album: DeepPartial<TAlbum>, media?: { id: string }[]) => new Promise<TAlbum>((resolve) => {
        if (media?.length) {
            album.idMedium = media[0].id
        }

        this.knex.insert({
            ...album,
            owner: album.owner?.id || album.owner
        })
            .into(this.tableName)
            .returning<TAlbum[]>('*')
            .then((result) => {
                if (media && result) {
                    const albumsMediaService = new AlbumsMediaService()
                    const albumsMedia = media.map((medium) => ({
                        idMedium: medium.id,
                        idAlbum: result[0].id
                    })) || []

                    albumsMediaService.createMany(albumsMedia).then(() => {
                        resolve(result[0])
                    })
                }
                else {
                    resolve(result[0])
                }
            })
    })

    createMany = (albums: DeepPartial<TAlbum>[], media?: { id: string }[]) => new Promise<TAlbum[]>((resolve) => {
        const primaryKeys = albums.map((album) => this.createOne(album, media))

        Promise.all(primaryKeys).then((results) => {
            resolve(results)
        })
    })

    readOne = (id: string | null) => new Promise<TAlbum>((resolve) => {
        this.knex.from(this.tableName).select().where({
            id
        }).then((res) => {
            resolve(res[0])
        })
    })

    readMany = (limit = 100) => new Promise<TAlbum[]>((resolve) => {
        this.knex.from(this.tableName).select().limit(limit).then((res) => {
            resolve(res)
        })
    })

    update = (ids: string[] | string, newProps: Partial<TAlbum>) => new Promise<TAlbum[]>((resolve) => {
        delete newProps.id

        const idsToUpdate = Array.isArray(ids) ? ids : [ids]

        this.knex.from(this.tableName).whereIn('id', idsToUpdate)
            .update(newProps)
            .returning('*')
            .then((res) => {
                resolve(res)
            })
    })

    destroy = (keys: (string | null)[] | string) => new Promise<TAlbum[]>((resolve) => {
        const keysToDestroy = Array.isArray(keys) ? keys : [keys]

        this.knex.from(this.tableName).whereIn('id', keysToDestroy).delete().returning('*').then((res) => {
            resolve(res)
        })
    })
}
