import AlbumsService from '../../services/albums'
import { predefinedAlbumUUIDs, predefinedMediumUUIDs, predefinedUserUUIDs } from '../helpers/ids'

export default async (truncateOnly = false) => {
    const service = new AlbumsService()

    await service.truncate()

    if (truncateOnly) {
        return
    }

    const mediaToAdd = [
        {
            id: predefinedMediumUUIDs[0]
        },
        {
            id: predefinedMediumUUIDs[1]
        },
        {
            id: predefinedMediumUUIDs[2]
        }
    ]

    for (let i = 0; i < 4; i++) {
        await service.createOne({
            id: predefinedAlbumUUIDs[i],
            title: `Test Album ${i}`,
            description: `Test Description ${i}`,
            owner: {
                id: predefinedUserUUIDs[0]
            }
        }, mediaToAdd)
    }

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
