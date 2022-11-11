import { Knex } from 'knex'
import fs from 'fs'
import { fileToMedium } from '../../helpers/exif'
import MediaService from '../../services/media'
import { Medium } from '../../types'
import { predefinedMediumUUIDs } from '../helpers/ids'

export async function seed (knex: Knex) {
    await knex('media').del()
    const service = new MediaService()
    const media = []

    for (let i = 0; i < 7; i++) {
        const downloadPromise = new Promise<Partial<Medium>>((resolve) => {
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
