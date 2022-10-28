import { Knex } from 'knex'
import fs from 'fs'
import { exifToMedium } from '../../helpers/exif'
import MediaService from '../../services/media'
import { Medium } from '../../types'
import { getDatabase } from '../index'

export async function seed (k: Knex) {
    const knex = getDatabase()
    await knex('media').del()
    const service = new MediaService()
    const media = []

    const predefinedUUIDs = [
        '9b004ea9-996f-4c18-92e3-bec2b9051585',
        '2b96675e-2428-4520-909e-91e8a91fb5f9',
        '114d5e91-b89e-4a31-9305-d3753bf64f2c',
        'bc8b723c-3f58-4bd6-a2e5-9fa1fbdd305d',
        '3498b0eb-9433-4c90-a27b-ac1f08221fa7',
        '6e11ebf1-4d3d-457d-b27b-7fcf66d5bb16',
        '2ef6335e-ef45-400f-97ee-213f2c1e1a48',
        'f6236bf9-de5e-4db6-afe8-4d98ea34b682',
        '0ca2f1ae-4da8-4f4f-819f-2ef13fc111d7',
        'df28db85-b6fe-4b5f-8f2a-4d5347efb3de'
    ]

    for (let i = 0; i < 7; i++) {
        const downloadPromise = new Promise<Omit<Medium, 'dateCreated' | 'dateModified'>>((resolve) => {
            const filename = predefinedUUIDs[i]
            const fullPath = `uploads/${filename}`

            fs.copyFileSync(`../cypress/fixtures/image-${i}.jpg`, fullPath)

            exifToMedium(fullPath, filename, `Test Image ${i}`).then((medium) => {
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
