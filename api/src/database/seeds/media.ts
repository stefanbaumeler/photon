import { Knex } from 'knex'
import fs from 'fs'
import { randomUUID } from 'crypto'
import { exifToMedium } from '../../helpers/exif'
import MediaService from '../../services/media'
import { Medium } from '../../types'

export async function seed (knex: Knex) {
    await knex('media').del()
    const service = new MediaService()
    const downloads = []

    for (let i = 0; i < 7; i++) {
        const downloadPromise = new Promise<Omit<Medium, 'id' | 'dateCreated' | 'dateModified'>>((resolve) => {
            const filename = randomUUID()
            const fullPath = `uploads/${filename}`

            fs.copyFileSync(`../cypress/fixtures/image-${i}.jpg`, fullPath)

            exifToMedium(fullPath, filename, `Test Image ${i}`).then((medium) => {
                resolve(medium)
            })
        })

        downloads.push(downloadPromise)
    }

    await Promise.all(downloads).then(async (responses) => {
        console.log(responses)

        await service.createMany(responses)
    })
}
