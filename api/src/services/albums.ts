import AlbumsMediaService from './albumsMedia'
import { Prisma } from '@prisma/client'
import { DB } from '../database'

export default class AlbumsService {
    constructor (public context?: { user: { id: string } }) {}

    createOne = async (album: Prisma.AlbumCreateInput, media?: { id: string }[]) => {
        if (media?.length) {
            album.cover = {
                connect: {
                    id: media[0].id
                }
            }
        }

        const created = await DB.album.create({
            data: {
                ...album,
                cover: album.cover,
                owner: album.owner ? album.owner : {
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

        return created
    }

    readOne = async (id: string) => {
        return DB.album.findFirst({
            where: {
                id
            },
            include: {
                owner: true,
                cover: {
                    include: {
                        owner: true
                    }
                },
                albumMedia: {
                    select: {
                        idMedium: true
                    }
                }
            }
        })
    }

    readMany = async (conditions: Prisma.AlbumWhereInput = {}, take = 100) => {
        return DB.album.findMany({
            where: conditions,
            take,
            include: {
                owner: true,
                cover: {
                    include: {
                        owner: true
                    }
                },
                albumMedia: {
                    select: {
                        idMedium: true
                    }
                }
            }
        })
    }

    updateMany = async (ids: string[], newProps: Prisma.AlbumUpdateInput) => {
        delete newProps.id

        return DB.album.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: newProps
        })
    }

    update = async (id: string, newProps?: Prisma.AlbumUpdateInput) => {
        delete newProps?.id

        return DB.album.update({
            where: {
                id
            },
            data: {
                ...newProps,
                cover: newProps?.cover
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
    }

    destroy = async (keys: (string | null)[] | string) => {
        const keysToDestroy = (Array.isArray(keys) ? keys.filter((key) => key !== null) : [keys]) as string[]

        return DB.album.deleteMany({
            where: {
                id: {
                    in: keysToDestroy
                }
            }
        })
    }
}
