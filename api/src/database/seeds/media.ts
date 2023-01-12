import MediaService from '../../services/media'
import { predefinedMediumUUIDs, predefinedUserUUIDs } from '../helpers/ids'
import { fileToMedium } from '../../helpers/exif'
import fs from 'fs'
import path from 'path'
import { getEnv } from '../../../env'
import { TMedium } from '@photon/schema'

const env = getEnv()

export default async (truncateOnly = false) => {
    const service = new MediaService()

    await service.truncate()

    if (truncateOnly) {
        return
    }

    for (let i = 0; i < 7; i++) {
        const filename = predefinedMediumUUIDs[i]
        const fixturePath = path.join(__dirname, '../', `fixtures/image-${i}.jpg`)
        const fullPath = path.join(__dirname, '../../../', env.API_UPLOADS_DIR, filename)

        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads')
        }

        fs.copyFileSync(fixturePath, fullPath)

        const medium = await fileToMedium({
            filePath: fullPath,
            fileName: filename,
            originalName: `Test Image ${i}.jpg`,
            type: 'image/jpeg',
            user: predefinedUserUUIDs[0]
        })

        const m = {
            ...medium,
            dateCreated: new Date('2022-11-11 00:00:00'),
            dateModified: new Date('2022-11-11 00:00:00'),
            id: filename,
            owner: {
                id: predefinedUserUUIDs[0]
            },
            uploader: {
                id: predefinedUserUUIDs[0]
            },
            favoredBy: i < 3 ? [{
                id: predefinedUserUUIDs[0]
            }] : []
        } as TMedium

        await service.createOne(m)
    }
}
