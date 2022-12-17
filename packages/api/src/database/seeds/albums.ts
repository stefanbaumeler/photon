import AlbumsService from '../../services/albums'
import { TAlbum } from '../'
import { predefinedAlbumUUIDs, predefinedMediumUUIDs, predefinedUserUUIDs } from '../helpers/ids'
import { DeepPartial } from '../../types'

export default async (truncateOnly = false) => {
    const service = new AlbumsService()

    await service.truncate()

    if (truncateOnly) {
        return
    }

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

    await service.createMany(fakeAlbums, predefinedMediumUUIDs.map((id) => ({
        id
    })))

    await service.createOne({
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
