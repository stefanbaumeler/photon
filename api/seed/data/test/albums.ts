import { createAlbumWithMedia, defaultUser } from '../helpers'
import type { album, mediumToAlbum } from '../../../src/drizzle/schema'

const albumIds = ['26a903e8-e06a-4063-8846-0263168251b6', '064846fe-6e4e-410d-9baf-db12982d287e', 'fd8a10df-5db5-44ad-b131-019c274a1096', 'de0881c3-b22a-4c03-9ac9-e1cc9ca93bb8', 'c9260452-784a-43f0-aef1-4367e42734cb']
const mediaIds = ['9b004ea9-996f-4c18-92e3-bec2b9051585', '2b96675e-2428-4520-909e-91e8a91fb5f9', '114d5e91-b89e-4a31-9305-d3753bf64f2c']

export const albumsData: typeof album.$inferInsert[] = [
    {
        id: '26a903e8-e06a-4063-8846-0263168251b6',
        title: 'Test Album 0',
        idCover: mediaIds[0],
        idOwner: defaultUser
    },
    {
        id: '064846fe-6e4e-410d-9baf-db12982d287e',
        title: 'Test Album 1',
        idCover: mediaIds[0],
        idOwner: defaultUser
    },
    {
        id: 'fd8a10df-5db5-44ad-b131-019c274a1096',
        title: 'Test Album 2',
        idCover: mediaIds[0],
        idOwner: defaultUser
    },
    {
        id: 'de0881c3-b22a-4c03-9ac9-e1cc9ca93bb8',
        title: 'Test Album 3',
        idCover: mediaIds[0],
        idOwner: defaultUser
    },
    {
        id: 'c9260452-784a-43f0-aef1-4367e42734cb',
        title: 'Test Single',
        idCover: mediaIds[0],
        idOwner: defaultUser
    }
]

export const mediumToAlbumData: typeof mediumToAlbum.$inferInsert[] = [
    ...createAlbumWithMedia(albumIds[0], mediaIds),
    ...createAlbumWithMedia(albumIds[1], mediaIds),
    ...createAlbumWithMedia(albumIds[2], mediaIds),
    ...createAlbumWithMedia(albumIds[3], mediaIds),
    ...createAlbumWithMedia(albumIds[4], [mediaIds[0]])
]
