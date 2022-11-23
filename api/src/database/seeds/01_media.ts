import { Knex } from 'knex'
import fs from 'fs'
import { fileToMedium } from '../../helpers/exif'
import MediaService from '../../services/media'
import { TMedium } from '@photon/shared'
import { predefinedMediumUUIDs, predefinedUserUUIDs } from '../helpers/ids'
import { DeepPartial } from '../../types'

export async function seed (knex: Knex) {
    await knex('media').del()
    const service = new MediaService()
    const media = []

    for (let i = 0; i < 7; i++) {
        const downloadPromise = new Promise<DeepPartial<TMedium>>((resolve) => {
            const filename = predefinedMediumUUIDs[i]
            const fullPath = `uploads/${filename}`

            if (!fs.existsSync('uploads')) {
                fs.mkdirSync('uploads')
            }

            fs.copyFileSync(`../cypress/fixtures/image-${i}.jpg`, fullPath)

            fileToMedium({
                filePath: fullPath,
                fileName: filename,
                originalName: `Test Image ${i}`,
                type: 'image/jpeg'
            }).then((medium) => {
                resolve({
                    id: filename,
                    owner: {
                        id: predefinedUserUUIDs[0]
                    },
                    uploader: {
                        id: predefinedUserUUIDs[0]
                    },
                    ...medium
                })
            })
        })

        media.push(downloadPromise)
    }

    await Promise.all(media).then(async (responses) => {
        await service.createMany(responses)
    })
}
