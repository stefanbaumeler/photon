import AlbumsMediaService from './albumsMedia'
import { DeepPartial } from '../types'
import UsersService from './users'
import { getDatabase, TAlbum } from '../database'
import { Prisma } from '.prisma/client'

export default class AlbumsService {
    prisma = getDatabase()

    context

    constructor (context?: { user: { id: string } }) {
        this.context = context
    }

    truncate = async () => {
        return this.prisma.album.deleteMany({
            where: {}
        })
    }

    createOne = async (album: DeepPartial<TAlbum>, media?: { id: string }[]) => {
        if (media?.length) {
            album.cover = media[0]
        }

        const created = await this.prisma.album.create({
            data: {
                ...album,
                cover: album.cover ? {
                    connect: {
                        id: album.cover?.id
                    }
                } : undefined,
                owner: album.owner ? {
                    connect: {
                        id: album.owner.id
                    }
                } : {
                    connect: {
                        id: this.context?.user.id
                    }
                }
            },
            include: {
                owner: true
            }
        })

        if (media && created) {
            const albumsMediaService = new AlbumsMediaService()
            const albumsMedia = media.map((medium) => ({
                idMedium: medium.id,
                idAlbum: created.id
            })) || []

            await albumsMediaService.createMany(albumsMedia)
        }

        return created as TAlbum
    }

    readOne = async (id: string) => {
        const album = await this.prisma.album.findFirst({
            where: {
                id
            },
            include: {
                owner: true,
                cover: true
            }
        })

        const asTAlbum = album as TAlbum

        if (album?.owner) {
            asTAlbum.owner = await new UsersService().readOne(album.owner.id)
        }

        return asTAlbum
    }

    readMany = async (conditions: Prisma.AlbumWhereInput = {}, take = 100) => {
        const data = await this.prisma.album.findMany({
            where: conditions,
            take,
            include: {
                owner: true,
                cover: true
            }
        })

        return data as TAlbum[]
    }

    updateMany = async (ids: string[], newProps: Partial<TAlbum>) => {
        delete newProps.id

        return this.prisma.album.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: newProps
        })
    }

    update = async (id: string, newProps: Partial<TAlbum>) => {
        delete newProps.id

        return await this.prisma.album.update({
            where: {
                id
            },
            data: {
                ...newProps,
                owner: newProps.owner ? {
                    connect: {
                        id: newProps.owner.id
                    }
                } : undefined,
                cover: newProps.cover ? {
                    connect: {
                        id: newProps.cover.id
                    }
                } : undefined
            },
            include: {
                owner: true,
                cover: true
            }
        }) as TAlbum
    }

    destroy = async (keys: (string | null)[] | string) => {
        const keysToDestroy = (Array.isArray(keys) ? keys.filter((key) => key !== null) : [keys]) as string[]

        return this.prisma.album.deleteMany({
            where: {
                id: {
                    in: keysToDestroy
                }
            }
        })
    }
}
