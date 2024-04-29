import { defaultUser, createTags } from '../helpers'
import { favorite, medium, mediumToTag } from '../../../src/drizzle/schema'

const mediaIds = ['9b004ea9-996f-4c18-92e3-bec2b9051585', '2b96675e-2428-4520-909e-91e8a91fb5f9', '114d5e91-b89e-4a31-9305-d3753bf64f2c', 'bc8b723c-3f58-4bd6-a2e5-9fa1fbdd305d', '3498b0eb-9433-4c90-a27b-ac1f08221fa7', '6e11ebf1-4d3d-457d-b27b-7fcf66d5bb16', '2ef6335e-ef45-400f-97ee-213f2c1e1a48']

export const mediaData: typeof medium.$inferInsert[] = [
    {
        id: mediaIds[0],
        hash: '4027638022486444',
        dateCreated: '2022-11-10T23:00:00.000Z',
        dateModified: '2022-11-10T23:00:00.000Z',
        dateModifiedStatus: '2023-03-19T09:29:00.582Z',
        dateTaken: '2022-07-22T13:33:36.000Z',
        filenameDisk: mediaIds[0],
        filenameDownload: 'Test Image 0.jpg',
        title: 'Test Image 0',
        location: [],
        status: 'all',
        mimetype: 'image/jpeg',
        meta: {
            height: 3072,
            width: 4080,
            cameraMake: 'Google',
            cameraModel: 'Pixel 6',
            flash: 16,
            fNumber: 1.85,
            iso: 40,
            focalLength: '6.81 mm'
        },
        idOwner: defaultUser,
        idUploader: defaultUser
    },
    {
        id: mediaIds[1],
        hash: '6399297107300791',
        dateCreated: '2022-11-10T23:00:00.000Z',
        dateModified: '2022-11-10T23:00:00.000Z',
        dateModifiedStatus: '2023-03-19T09:29:00.672Z',
        dateTaken: '2022-07-22T13:18:09.000Z',
        filenameDisk: mediaIds[1],
        filenameDownload: 'Test Image 1.jpg',
        title: 'Test Image 1',
        location: [],
        status: 'all',
        mimetype: 'image/jpeg',
        meta: {
            height: 4108,
            width: 9216,
            cameraMake: 'Google',
            cameraModel: 'Pixel 6'
        },
        idOwner: defaultUser,
        idUploader: defaultUser
    },
    {
        id: mediaIds[2],
        hash: '7970782094991679',
        dateCreated: '2022-11-10T23:00:00.000Z',
        dateModified: '2022-11-10T23:00:00.000Z',
        dateModifiedStatus: '2023-03-19T09:29:00.702Z',
        dateTaken: '2017-06-17T09:47:02.000Z',
        filenameDisk: mediaIds[2],
        filenameDownload: 'Test Image 2.jpg',
        title: 'Test Image 2',
        location: [
            4.33674166,
            666667,
            9.158188888888889
        ],
        status: 'all',
        mimetype: 'image/jpeg',
        meta: {
            height: 3036,
            width: 4048,
            cameraMake: 'Google',
            cameraModel: 'Pixel XL',
            flash: 16,
            fNumber: 2,
            iso: 62,
            focalLength: '4.67 mm'
        },
        idOwner: defaultUser,
        idUploader: defaultUser
    },
    {
        id: mediaIds[3],
        hash: '8031633646104408',
        dateCreated: '2022-11-10T23:00:00.000Z',
        dateModified: '2022-11-10T23:00:00.000Z',
        dateModifiedStatus: '2023-03-19T09:29:00.747Z',
        dateTaken: '2022-07-22T07:18:09.000Z',
        filenameDisk: mediaIds[3],
        filenameDownload: 'Test Image 3.jpg',
        title: 'Test Image 3',
        location: [],
        status: 'all',
        mimetype: 'image/jpeg',
        meta: {
            height: 3072,
            width: 4080,
            cameraMake: 'Google',
            cameraModel: 'Pixel 6',
            flash: 16,
            fNumber: 1.85,
            iso: 44,
            focalLength: '6.81 mm'
        },
        idOwner: defaultUser,
        idUploader: defaultUser
    },
    {
        id: mediaIds[4],
        hash: '4786596051521061',
        dateCreated: '2022-11-10T23:00:00.000Z',
        dateModified: '2022-11-10T23:00:00.000Z',
        dateModifiedStatus: '2023-03-19T09:29:00.777Z',
        dateTaken: '2022-07-22T09:10:19.000Z',
        filenameDisk: mediaIds[4],
        filenameDownload: 'Test Image 4.jpg',
        title: 'Test Image 4',
        location: [],
        status: 'all',
        mimetype: 'image/jpeg',
        meta: {
            height: 3072,
            width: 4080,
            cameraMake: 'Google',
            cameraModel: 'Pixel 6',
            flash: 16,
            fNumber: 1.85,
            iso: 44,
            focalLength: '6.81 mm'
        },
        idOwner: defaultUser,
        idUploader: defaultUser
    },
    {
        id: mediaIds[5],
        hash: '1663484318860797',
        dateCreated: '2022-11-10T23:00:00.000Z',
        dateModified: '2022-11-10T23:00:00.000Z',
        dateModifiedStatus: '2023-03-19T09:29:00.810Z',
        dateTaken: '2022-07-22T09:35:19.000Z',
        filenameDisk: mediaIds[5],
        filenameDownload: 'Test Image 5.jpg',
        title: 'Test Image 5',
        location: [],
        status: 'all',
        mimetype: 'image/jpeg',
        meta: {
            height: 3072,
            width: 4080,
            cameraMake: 'Google',
            cameraModel: 'Pixel 6',
            flash: 16,
            fNumber: 1.85,
            iso: 39,
            focalLength: '6.81 mm'
        },
        idOwner: defaultUser,
        idUploader: defaultUser
    },
    {
        id: mediaIds[6],
        hash: '80032229074241',
        dateCreated: '2022-11-10T23:00:00.000Z',
        dateModified: '2022-11-10T23:00:00.000Z',
        dateModifiedStatus: '2023-03-19T09:29:00.836Z',
        dateTaken: '2022-07-22T08:41:00.000Z',
        filenameDisk: mediaIds[6],
        filenameDownload: 'Test Image 6.jpg',
        title: 'Test Image 6',
        location: [],
        status: 'all',
        mimetype: 'image/jpeg',
        meta: {
            height: 3072,
            width: 4080,
            cameraMake: 'Google',
            cameraModel: 'Pixel 6',
            flash: 16,
            fNumber: 1.85,
            iso: 45,
            focalLength: '6.81 mm'
        },
        idOwner: defaultUser,
        idUploader: defaultUser
    }
]

export const favoritesData: typeof favorite.$inferInsert[] = [
    {
        idMedium: mediaIds[0],
        idUser: defaultUser
    },
    {
        idMedium: mediaIds[1],
        idUser: defaultUser
    }
]
