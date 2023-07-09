import { Prisma } from '@prisma/client'
import { connectDefaultUser, connectId, connectIds } from '../helpers'

export const albums: Prisma.AlbumCreateInput[] = [
    {
        id: '09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4',
        title: 'Dev Album 1',
        cover: connectId('39551190-5f17-4886-a200-5361b4d21117'),
        owner: connectDefaultUser(),
        media: connectIds([
            '39551190-5f17-4886-a200-5361b4d21117',
            '5ebbdefe-8b60-43c4-8e97-8e0ad2ea8c35',
            '6ab4ef73-ffb9-47a9-b5da-5d7982b17c96',
            '72e8368b-4abd-4dab-9409-30432f6b041d',
            'd578e91d-16e5-4061-b2a2-2e8fef1143d0',
            '0ef17bcb-dda0-4e5d-92ea-2fffa889a003',
            'c1619be0-f8ba-4473-b12f-30ce74e924b3',
            'f4b6aeab-ee3d-4c00-8d4b-8a78aa20e004'
        ])
    },
    {
        id: '738110c5-c8c1-400f-aa29-b95772d6324e',
        title: 'Dev Album 3',
        cover: connectId('8f31a167-05ef-49e0-9ac7-730e826c32c4'),
        owner: connectDefaultUser(),
        media: connectIds([
            '8f31a167-05ef-49e0-9ac7-730e826c32c4',
            '13722eb1-5607-4af7-af20-11ab901ec1ba',
            '053aab5b-5366-4fa1-b9ac-7161b6f2dc5a',
            '6d5bde04-5e56-4851-b67b-244821666c8b',
            '31b41aba-4ce4-43e3-9b90-85e71a1acb14',
            'f2c1af18-eae1-4ff3-ae92-f79247487068',
            '16472155-e18a-4428-9fec-7a86e79c0a0c',
            '3f21bbf0-cf5f-491a-ac9a-66335170a6b0',
            '7ff3fb66-381f-4b06-a07b-f2eb2a7c1a31',
            'e4a39dbf-a958-4712-96c1-109d6f48f0de',
            'c1a8ed5d-5bb4-4311-bedc-fa7298727d35',
            '8d00dff5-32f4-4fbc-a23c-b3d097e5e796',
            '5f269c44-612f-41ea-9785-18416997c743',
            '95b6eb9f-3b66-4bbf-8236-8001bf2e78fe',
            '5441c7f2-8b03-4460-815a-98e3e2baa308',
            '8e1cc00e-fc30-4a08-ad1c-1b6545b3f4a8',
            '7d87fcd4-2480-4baf-bf08-142fa8ed1ae2',
            '2d04942d-0429-4715-90c4-b59333683c29',
            '130c2ba3-9879-46e9-a82b-6c47fb5b27f8',
            'd9f3b88a-610d-4de1-b2d7-651e11ed6b5d',
            '09767849-846b-4715-9054-73e3d0f28a5b',
            '6ce608e8-a3d7-448a-a173-9bba39b74537',
            '8e95a7b5-b510-4fbb-bc2c-e44b34cebfad',
            '94055771-4407-412f-aa2b-65d90f17bbec',
            '9275a4b2-350d-4227-8afc-6f600f2b67e6',
            'bb05ea01-73e3-46ac-923f-fd8e8d2ff299',
            '4d4bfabe-3d18-4d41-bfca-b7022465ce11',
            '80d6c492-6e2a-4a34-acd2-e11b85ce4d2f',
            '2cc36219-41db-40a9-bb1d-fc97fd139715',
            '6d1e9cc8-8714-4484-a403-4da14cac19e5',
            '207ae6bf-b563-4efd-be08-bcfbe5f21d1f',
            '46bd621f-10f2-4e9d-80c9-9b88cf5e791b',
            '66fcca20-2666-4281-bce7-3114941961ce',
            '5c778a62-d9c4-4cdd-b386-e9e90a28d679',
            '73862c50-14a5-4af7-882e-685f787938d1'
        ])
    },
    {
        id: '77e4c72c-6ebc-4f8d-a787-9e4a63388288',
        title: 'Dev Album 2',
        cover: connectId('69cab0f7-d6eb-4a8e-81d2-e3c494e719b2'),
        owner: connectDefaultUser(),
        media: connectIds([
            '69cab0f7-d6eb-4a8e-81d2-e3c494e719b2',
            'ce5c0eac-9a37-40ff-8c86-074ea7466859',
            '8a414f1a-7c59-429a-9758-956391249883'
        ])
    }
]
