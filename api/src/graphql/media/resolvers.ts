import MediaService from '../../services/media'
import { Medium } from '../../types'
import { randomUUID } from 'crypto'
import fs from 'fs'
import { fileToMedium } from '../../helpers/exif'
import { Upload } from 'graphql-upload'

const queries = {
    media: (_: any, input: { status: string }) => {
        return new MediaService().readMany(input.status ? {
            status: input.status
        } : {})
    },
    medium: (_: any, input: { id: number }) => new MediaService().readOne(input.id)
}

const mutations = {
    emptyTrash: async () => {
        const service = new MediaService()

        await service.readMany({
            status: 'trash'
        }).then(async (results) => {
            await service.destroy(results.map((result) => result.id))
        })
    },
    upload: async (_: any, { file: files }: { file: Upload[] }) => {
        const service = new MediaService()

        const writePromises = files.map((file) => new Promise<Partial<Medium>> ((resolve) => {
            const name = randomUUID()
            const pathName = `./uploads/${name}`

            Promise.resolve(file).then(async (f) => {
                const {
                    createReadStream, filename, mimetype
                } = await f.promise
                const writeFileToDisk = new Promise<string>((r) => {
                    const stream = createReadStream()

                    stream.pipe(fs.createWriteStream(pathName)).on('finish', () => {
                        r(filename)
                    })
                })

                Promise.resolve(writeFileToDisk).then((filename) => {
                    fileToMedium({
                        filePath: pathName,
                        fileName: name,
                        originalName: filename,
                        type: mimetype
                    }).then((medium) => {
                        resolve(medium)
                    })
                })
            })
        }))

        await Promise.all(writePromises).then(async (data) => {
            await service.createMany(data)
        })

        return []
    },
    setMediaStatus: async (_: any, input: { media: string[], status: string }) => {
        return await new MediaService().update(input.media, {
            dateModifiedStatus: 'NOW()',
            status: input.status
        })
    },
    rotate: (_: any, input: { id: string }) => {
        return new MediaService().rotate(input.id)
    },
    deleteMedia: async (_: any, input: { ids: string[] }) => {
        return await new MediaService().destroy(input.ids)
    }
}

export default {
    queries,
    mutations
}
