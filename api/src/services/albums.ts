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

        return DB.album.create({
            data: {
                ...album,
                cover: album.cover,
                owner: album.owner ? album.owner : {
                    connect: {
                        id: this.context?.user.id
                    }
                },
                media: media ? {
                    connect: media.map((medium) => {
                        return {
                            id: medium.id
                        }
                    })
                } : undefined
            },
            include: {
                owner: true
            }
        })
    }

    readOne = async (id: string, mediaConditions?: Prisma.MediumWhereInput) => {
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
                media: {
                    where: mediaConditions,
                    include: {
                        favoredBy: true
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
                media: true,
                cover: true
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

    addToAlbum = async (id: string, mediaToAdd: string[]) => {
        return DB.album.update({
            where: {
                id
            },
            data: {
                media: {
                    connect: mediaToAdd.map((mediumToAdd) => {
                        return {
                            id: mediumToAdd
                        }
                    })
                }
            },
            include: {
                media: true,
                owner: true,
                cover: {
                    include: {
                        owner: true
                    }
                }
            }
        })
    }

    removeFromAlbum = async (id: string, mediaToRemove: string[]) => {
        return DB.album.update({
            where: {
                id
            },
            data: {
                media: {
                    disconnect: mediaToRemove.map((mediumToRemove) => {
                        return {
                            id: mediumToRemove
                        }
                    })
                }
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
        const albums = await this.readMany({
            id: {
                in: keysToDestroy
            }
        })

        await DB.album.deleteMany({
            where: {
                id: {
                    in: keysToDestroy
                }
            }
        })

        return albums
    }
}
