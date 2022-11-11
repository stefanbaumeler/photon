import { Knex } from 'knex'
import AlbumsService from '../../services/albums'
import { Album } from '../../types'
import { predefinedAlbumUUIDs, predefinedMediumUUIDs } from '../helpers/ids'

export async function seed (knex: Knex) {
    await knex('albums').del()

    const albumsService = new AlbumsService()

    const fakeAlbums: Partial<Album>[] = []

    for (let i = 0; i < 4; i++) {
        fakeAlbums.push({
            id: predefinedAlbumUUIDs[i],
            title: `Test Album ${i}`,
            description: `Test Description ${i}`
        })
    }

    await albumsService.createMany(fakeAlbums, predefinedMediumUUIDs.map((id) => ({
        id
    })))

    await albumsService.createOne({
        id: predefinedAlbumUUIDs[4],
        title: 'Test Single',
        description: 'Test Single Description'
    }, [{
        id: predefinedMediumUUIDs[0]
    }])
}
