import MediaService from '../../services/media'
import { predefinedMediumUUIDs, predefinedUserUUIDs } from '../helpers/ids'
import { fileToMedium } from '../../helpers/exif'
import fs from 'fs'

export default async (truncateOnly = false) => {
    const service = new MediaService()

    await service.truncate()

    if (truncateOnly) {
        return
    }

    for (let i = 0; i < 7; i++) {
        const filename = predefinedMediumUUIDs[i]
        const fullPath = `uploads/${filename}`

        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads')
        }

        fs.copyFileSync(`../../cypress/fixtures/image-${i}.jpg`, fullPath)

        await fileToMedium({
            filePath: fullPath,
            fileName: filename,
            originalName: `Test Image ${i}`,
            type: 'image/jpeg',
            user: predefinedUserUUIDs[0]
        }).then((medium) => {
            return {
                ...medium,
                id: filename,
                owner: {
                    id: predefinedUserUUIDs[0]
                },
                uploader: {
                    id: predefinedUserUUIDs[0]
                }
            }
        }).then(async (medium) => {
            await service.createOne(medium)
        })
    }
    //     const downloadPromise = new Promise<DeepPartial<TMedium>>((resolve) => {
    //         const filename = predefinedMediumUUIDs[i]
    //         const fullPath = `uploads/${filename}`
    //
    //         if (!fs.existsSync('uploads')) {
    //             fs.mkdirSync('uploads')
    //         }
    //
    //         fs.copyFileSync(`../cypress/fixtures/image-${i}.jpg`, fullPath)
    //
    //         fileToMedium({
    //             filePath: fullPath,
    //             fileName: filename,
    //             originalName: `Test Image ${i}`,
    //             type: 'image/jpeg'
    //         }).then((medium) => {
    //             resolve({
    //                 id: filename,
    //                 owner: {
    //                     id: predefinedUserUUIDs[0]
    //                 },
    //                 uploader: {
    //                     id: predefinedUserUUIDs[0]
    //                 },
    //                 ...medium
    //             })
    //         })
    //     })
    //
    //     media.push(downloadPromise)
    // }
    //
    // await Promise.all(media).then(async (responses) => {
    //     await service.createMany(responses)
    // })
}
