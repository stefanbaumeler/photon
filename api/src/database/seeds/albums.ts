import { Knex } from 'knex'
import AlbumsService from '../../services/albums'
import { faker } from '@faker-js/faker'
import { Album, AlbumsMedia } from '../../types'
import AlbumsMediaService from '../../services/albumsMedia'
import MediaService from '../../services/media'

export async function seed (knex: Knex) {
    console.log(process.env.NODE_ENV, process.env.PG_DATABASE_NAME, process.env.PG_DATABASE_USER)
    await knex('albums').del()

    const albumsService = new AlbumsService()
    const albumsMediaService = new AlbumsMediaService()
    const mediaService = new MediaService()

    const fakeAlbums: Partial<Album>[] = []

    for (let i = 0; i < 5; i++) {
        fakeAlbums.push({
            title: faker.lorem.words(Math.floor(Math.random() * 10) + 1),
            description: faker.lorem.words(Math.floor(Math.random() * 100) + 10)
        })
    }

    Promise.all([albumsService.createMany(fakeAlbums), mediaService.readMany()]).then(([ids, media]) => {
        ids.forEach((id) => {
            const fakeAlbumsMediaEntries: Omit<AlbumsMedia, 'id'>[] = []
            for (let i = 0; i < Math.floor(Math.random() * media.length) + 1; i++) {
                fakeAlbumsMediaEntries.push({
                    idMedium: media[i].id,
                    idAlbum: id
                })
            }

            albumsMediaService.createMany(fakeAlbumsMediaEntries)
        })
    })
}
