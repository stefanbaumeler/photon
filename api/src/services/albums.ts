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

    async createOne (album: Partial<Album>, media?: Pick<Medium, 'id'>[]) {
        if (media?.length) {
            album.idMedium = media[0].id
        }

        return new Promise<string | number>((resolve) => {
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
                })
        })
    }

    async createMany (albums: Album[]) {
        const primaryKeys = albums.map((album) => this.createOne(album))

        return await Promise.all(primaryKeys).then((results) => {
            return results
        })
    }

    async readOne (id: string | number) {
        return this.knex.from(this.tableName).select().where({
            id
        })
    }

    async readMany (limit = 100) {
        return this.knex.from(this.tableName).select().limit(limit)
    }

    async updateOne (id: string | number, newProps: Partial<Album>) {
        delete newProps.id

        return this.knex.from(this.tableName).where({
            id
        }).update(newProps)
    }
}
