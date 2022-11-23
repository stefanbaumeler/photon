import { Knex } from 'knex'
import AlbumsService from '../../services/albums'
import { TAlbum } from '@photon/shared'
import { predefinedAlbumUUIDs, predefinedMediumUUIDs, predefinedUserUUIDs } from '../helpers/ids'
import { DeepPartial } from '../../types'

export async function seed (knex: Knex) {
    await knex('albums').del()

    const albumsService = new AlbumsService()

    const fakeAlbums: DeepPartial<TAlbum>[] = []

    for (let i = 0; i < 4; i++) {
        fakeAlbums.push({
            id: predefinedAlbumUUIDs[i],
            title: `Test Album ${i}`,
            description: `Test Description ${i}`,
            owner: {
                id: predefinedUserUUIDs[0]
            }
        })
    }

    await albumsService.createMany(fakeAlbums, predefinedMediumUUIDs.map((id) => ({
        id
    })))

    await albumsService.createOne({
        id: predefinedAlbumUUIDs[4],
        title: 'Test Single',
        description: 'Test Single Description',
        owner: {
            id: predefinedUserUUIDs[0]
        }
    }, [{
        id: predefinedMediumUUIDs[0]
    }])
}
