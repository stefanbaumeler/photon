import MediaService from '../../services/media'
import { randomUUID } from 'crypto'
import fs from 'fs'
import { fileToMedium } from '../../helpers/exif'
import { TQueryResolvers, TMedium, TMutationResolvers } from '@photon/shared'
import { DeepPartial } from '../../types'

const queries: Partial<TQueryResolvers> = {
    media: async (_, input, context) => {
        return new MediaService().readMany(input.status ? {
            status: input.status,
            owner: {
                id: context.user.id
            }
        } : {
            owner: {
                id: context.user.id
            }
        })
    },
    medium: async (_, input) => await new MediaService().readOne(input.id)
}

const mutations: Partial<TMutationResolvers> = {
    emptyTrash: () => new Promise<TMedium[]>((resolve) => {
        const service = new MediaService()

        service.readMany({
            status: 'trash'
        }).then(async (results) => {
            resolve(service.destroy(results.map((result) => result.id as string)))
        })
    }),
    upload: async (_, { file: files }, context) => {
        const service = new MediaService()

        const writePromises = files.map((file) => new Promise<DeepPartial<TMedium> & { id?: string }> ((resolve) => {
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
                        type: mimetype,
                        user: context.user.id
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
    setMediaStatus: async (_, input) => {
        return new MediaService().updateMany(input.media as string[], {
            dateModifiedStatus: new Date(),
            status: input.status
        })
    },
    rotate: async (_, input) => {
        return await new MediaService().rotate(input.id)
    },
    deleteMedia: async (_, input) => {
        return await new MediaService().destroy(input.ids)
    }
}

export default {
    queries,
    mutations
}
