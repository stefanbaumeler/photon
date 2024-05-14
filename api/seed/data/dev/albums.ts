import { defaultUser } from '../helpers'
import type { album, mediumToAlbum } from '../../../src/drizzle/schema'

const albumIds = ['09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4', '738110c5-c8c1-400f-aa29-b95772d6324e', '77e4c72c-6ebc-4f8d-a787-9e4a63388288']

export const albumsData: typeof album.$inferInsert[] = [
    {
        id: albumIds[0],
        title: 'Dev Album 1',
        idCover: '39551190-5f17-4886-a200-5361b4d21117',
        idOwner: defaultUser
    },
    {
        id: '738110c5-c8c1-400f-aa29-b95772d6324e',
        title: 'Dev Album 3',
        idCover: '8f31a167-05ef-49e0-9ac7-730e826c32c4',
        idOwner: defaultUser
    },
    {
        id: '77e4c72c-6ebc-4f8d-a787-9e4a63388288',
        title: 'Dev Album 2',
        idCover: '69cab0f7-d6eb-4a8e-81d2-e3c494e719b2',
        idOwner: defaultUser
    }
]

export const mediumToAlbumData: typeof mediumToAlbum.$inferInsert[] = [
    {
        idMedium: '39551190-5f17-4886-a200-5361b4d21117',
        idAlbum: albumIds[0]
    },
    {
        idMedium: '5ebbdefe-8b60-43c4-8e97-8e0ad2ea8c35',
        idAlbum: albumIds[0]
    },
    {
        idMedium: '6ab4ef73-ffb9-47a9-b5da-5d7982b17c96',
        idAlbum: albumIds[0]
    },
    {
        idMedium: '72e8368b-4abd-4dab-9409-30432f6b041d',
        idAlbum: albumIds[0]
    },
    {
        idMedium: 'd578e91d-16e5-4061-b2a2-2e8fef1143d0',
        idAlbum: albumIds[0]
    },
    {
        idMedium: '0ef17bcb-dda0-4e5d-92ea-2fffa889a003',
        idAlbum: albumIds[0]
    },
    {
        idMedium: 'c1619be0-f8ba-4473-b12f-30ce74e924b3',
        idAlbum: albumIds[0]
    },
    {
        idMedium: 'f4b6aeab-ee3d-4c00-8d4b-8a78aa20e004',
        idAlbum: albumIds[0]
    },
    {
        idMedium: '8f31a167-05ef-49e0-9ac7-730e826c32c4',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '13722eb1-5607-4af7-af20-11ab901ec1ba',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '053aab5b-5366-4fa1-b9ac-7161b6f2dc5a',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '6d5bde04-5e56-4851-b67b-244821666c8b',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '31b41aba-4ce4-43e3-9b90-85e71a1acb14',
        idAlbum: albumIds[1]
    },
    {
        idMedium: 'f2c1af18-eae1-4ff3-ae92-f79247487068',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '16472155-e18a-4428-9fec-7a86e79c0a0c',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '3f21bbf0-cf5f-491a-ac9a-66335170a6b0',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '7ff3fb66-381f-4b06-a07b-f2eb2a7c1a31',
        idAlbum: albumIds[1]
    },
    {
        idMedium: 'e4a39dbf-a958-4712-96c1-109d6f48f0de',
        idAlbum: albumIds[1]
    },
    {
        idMedium: 'c1a8ed5d-5bb4-4311-bedc-fa7298727d35',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '8d00dff5-32f4-4fbc-a23c-b3d097e5e796',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '5f269c44-612f-41ea-9785-18416997c743',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '95b6eb9f-3b66-4bbf-8236-8001bf2e78fe',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '5441c7f2-8b03-4460-815a-98e3e2baa308',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '8e1cc00e-fc30-4a08-ad1c-1b6545b3f4a8',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '7d87fcd4-2480-4baf-bf08-142fa8ed1ae2',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '2d04942d-0429-4715-90c4-b59333683c29',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '130c2ba3-9879-46e9-a82b-6c47fb5b27f8',
        idAlbum: albumIds[1]
    },
    {
        idMedium: 'd9f3b88a-610d-4de1-b2d7-651e11ed6b5d',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '09767849-846b-4715-9054-73e3d0f28a5b',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '6ce608e8-a3d7-448a-a173-9bba39b74537',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '8e95a7b5-b510-4fbb-bc2c-e44b34cebfad',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '94055771-4407-412f-aa2b-65d90f17bbec',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '9275a4b2-350d-4227-8afc-6f600f2b67e6',
        idAlbum: albumIds[1]
    },
    {
        idMedium: 'bb05ea01-73e3-46ac-923f-fd8e8d2ff299',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '4d4bfabe-3d18-4d41-bfca-b7022465ce11',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '80d6c492-6e2a-4a34-acd2-e11b85ce4d2f',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '2cc36219-41db-40a9-bb1d-fc97fd139715',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '6d1e9cc8-8714-4484-a403-4da14cac19e5',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '207ae6bf-b563-4efd-be08-bcfbe5f21d1f',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '46bd621f-10f2-4e9d-80c9-9b88cf5e791b',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '66fcca20-2666-4281-bce7-3114941961ce',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '5c778a62-d9c4-4cdd-b386-e9e90a28d679',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '73862c50-14a5-4af7-882e-685f787938d1',
        idAlbum: albumIds[1]
    },
    {
        idMedium: '69cab0f7-d6eb-4a8e-81d2-e3c494e719b2',
        idAlbum: albumIds[2]
    },
    {
        idMedium: 'ce5c0eac-9a37-40ff-8c86-074ea7466859',
        idAlbum: albumIds[2]
    },
    {
        idMedium: '8a414f1a-7c59-429a-9758-956391249883',
        idAlbum: albumIds[2]
    }
]