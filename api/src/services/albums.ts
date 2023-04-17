import AlbumsMediaService from './albumsMedia'
import { DeepPartial } from '../types'
import { getDatabase } from '../database'
import { TAlbum, TAlbumInput } from '@photon/schema'
import { Prisma } from '@prisma/client'

export default class AlbumsService {
    prisma = getDatabase()

    constructor (public context?: { user: { id: string } }) {}

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
                cover: {
                    include: {
                        owner: true
                    }
                }
            }
        })

        return album as TAlbum
    }

    readMany = async (conditions: Prisma.AlbumWhereInput = {}, take = 100) => {
        const data = await this.prisma.album.findMany({
            where: conditions,
            take,
            include: {
                owner: true,
                cover: {
                    include: {
                        owner: true
                    }
                }
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

    update = async (id: string, newProps: TAlbumInput | undefined | null) => {
        delete newProps?.id

        return await this.prisma.album.update({
            where: {
                id
            },
            data: {
                ...newProps as Omit<TAlbumInput, 'id'>,
                cover: newProps?.cover ? {
                    connect: {
                        id: newProps.cover
                    }
                } : undefined
            },
            include: {
                owner: true,
                cover: {
                    include: {
                        owner: true
                    }
                }
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
