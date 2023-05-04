import { getTypesense, SearchMediumProps } from './'
import { Prisma, PrismaClient } from '@prisma/client'
import MediaService from '../services/media'

const getRows = async (params: Prisma.MiddlewareParams, result: unknown): Promise<Prisma.PromiseReturnType<typeof mediaService.readMany>> => {
    const mediaService = new MediaService()
    const typesense = getTypesense()

    if (params.model === 'User' && params.args.data?.favorites) {
        const connector = params.args.data?.favorites.connect || params.args.data?.favorites.disconnect
        const connectors = Array.isArray(connector) ? connector : [connector]
        const ids = connectors.map(({ id }: { id: string }) => id)
        return await mediaService.readMany({
            conditions: {
                id: {
                    in: ids
                }
            }
        }) || []
    }

    if (params.model === 'AlbumMedium') {
        if (params.action === 'deleteMany') {
            return await mediaService.readMany({
                conditions: {
                    id: params.args.where.idMedium
                }
            }) || []
        }

        if (params.action === 'upsert') {
            const r = Array.isArray(result) ? result : [result]

            return r.map((row) => row.medium)
        }
    }

    if (params.model === 'Medium') {
        if (['create', 'update', 'upsert', 'delete'].includes(params.action)) {
            return Array.isArray(result) ? result : [result]
        }

        if (['updateMany'].includes(params.action)) {
            return await mediaService.readMany({
                conditions: params.args?.where
            }) || []
        }

        if (['deleteMany'].includes(params.action) && params.args) {
            const deletePromises = params.args.where.id.in.map((id: string) => new Promise((resolve) => {
                typesense.collections('media').documents(id).delete().then(() => {
                    resolve(true)
                })
            }))

            await Promise.all(deletePromises)
            return []
        }
    }

    return []
}

export default (database: PrismaClient) => {
    const typesense = getTypesense()

    database.$use(async (params, next) => {
        const result = await next(params)
        const rows = await getRows(params, result)

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

        rows.map((row, k): SearchMediumProps => {
            return {
                ...row,
                __typename: 'Medium',
                dateTakenSort: row.dateTaken ? Math.floor(row.dateTaken.getTime() / 1000) : 0,
                favoredBy: row.favoredBy?.map((fav) => fav.id) || [],
                isFavorite: !!row.favoredBy?.length,
                isArchived: row.status === 'archived',
                isTrash: row.status === 'trash',
                albums: albums[k]
            }
        }).forEach((row) => {
            typesense.collections<SearchMediumProps>('media').documents().upsert(row)
        })

        return result
    })
}
