import { TMedium } from '@photon/schema'
import { getTypesense } from './index'
import { PrismaClient } from '@prisma/client'

export default (database: PrismaClient) => {
    const typesense = getTypesense()

    database.$use(async (params, next) => {
        const result = await next(params)
        let rows: TMedium[] = []

        if (params.model === 'User' && params.args.data?.favorites) {
            const connector = params.args.data?.favorites.connect || params.args.data?.favorites.disconnect
            const connectors = Array.isArray(connector) ? connector : [connector]
            const ids = connectors.map(({ id }: { id: string }) => id)
            rows = await database?.medium.findMany({
                where: {
                    id: {
                        in: ids
                    }
                },
                include: {
                    owner: true,
                    uploader: true,
                    favoredBy: true
                }
            }) as TMedium[] || []
        }

        if (params.model === 'AlbumMedium') {
            if (params.action === 'deleteMany') {
                rows = await database?.medium.findMany({
                    where: {
                        id: params.args.where.idMedium
                    },
                    include: {
                        owner: true,
                        uploader: true,
                        favoredBy: true
                    }
                }) as TMedium[] || []
            }

            if (params.action === 'upsert') {
                const r = Array.isArray(result) ? result : [result]

                rows = r.map((row) => row.medium)
            }
        }

        if (params.model === 'Medium') {
            if (['create', 'update', 'upsert', 'delete'].includes(params.action)) {
                rows = (Array.isArray(result) ? result : [result]) as TMedium[]
            }

            if (['updateMany'].includes(params.action)) {
                rows = await database?.medium.findMany({
                    where: params.args?.where,
                    include: {
                        owner: true,
                        uploader: true,
                        favoredBy: true
                    }
                }) as TMedium[] || []
            }

            if (['deleteMany'].includes(params.action) && params.args) {
                const deletePromises = params.args.where.id.in.map((id: string) => new Promise((resolve) => {
                    typesense.collections('media').documents(id).delete().then(() => {
                        resolve(true)
                    })
                }))

                await Promise.all(deletePromises)
                rows = []
            }
        }

        const albumPromises = rows.map((row) => new Promise<string[]>((resolve) => {
            database?.albumMedium.findMany({
                where: {
                    medium: {
                        id: row.id,
                        status: {
                            in: ['archived', 'all']
                        }
                    }
                },
                include: {
                    album: true
                }
            }).then((albums) => {
                resolve(albums.map(({ idAlbum }) => idAlbum))
            })
        }))

        const albums = await Promise.all(albumPromises)

        rows.forEach((row, k) => {
            typesense.collections('media').documents().upsert({
                id: row.id,
                dateTaken: row.dateTaken?.toString() || null,
                dateTakenSort: Math.floor(row.dateTaken?.getTime() / 1000),
                title: row.title,
                generatedTags: row.generatedTags,
                meta: row.meta,
                mimetype: row.mimetype,
                filenameDisk: row.filenameDisk,
                status: row.status,
                favoredBy: row.favoredBy || [],
                isFavorite: !!row.favoredBy?.length,
                isArchived: row.status === 'archived',
                isTrash: row.status === 'trash',
                albums: albums[k]
            })
        })

        return result
    })
}
