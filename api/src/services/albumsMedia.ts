import { AlbumsMedia } from '../types'
import { getDatabase } from '../database'
import { TMedium } from '@photon/schema'

export default class AlbumsMediaService {
    prisma = getDatabase()

    createOne = async (albumMedium: Omit<AlbumsMedia, 'id'>) => {
        return this.prisma.albumMedium.upsert({
            where: {
                idAlbum_idMedium: {
                    idAlbum: albumMedium.idAlbum,
                    idMedium: albumMedium.idMedium
                }
            },
            create: albumMedium,
            update: albumMedium,
            include: {
                medium: {
                    include: {
                        favoredBy: true
                    }
                }
            }
        })
    }

    createMany = async (albumsMedia: Omit<AlbumsMedia, 'id'>[]) => {
        const results = await this.prisma.$transaction(
            albumsMedia.map((albumMedium) => {
                return this.prisma.albumMedium.upsert({
                    where: {
                        idAlbum_idMedium: {
                            idAlbum: albumMedium.idAlbum,
                            idMedium: albumMedium.idMedium
                        }
                    },
                    create: albumMedium,
                    update: albumMedium,
                    include: {
                        medium: {
                            include: {
                                favoredBy: true
                            }
                        }
                    }
                })
            })
        )

        return results.map(({ medium }) => medium) as TMedium[]
    }

    removeFromAlbum = async (idAlbum: string, mediaIds: string[]) => {
        return this.prisma.albumMedium.deleteMany({
            where: {
                idAlbum,
                idMedium: {
                    in: mediaIds
                }
            }
        })
    }

    readAlbumsOfMedium = async (idMedium: string) => {
        const res = await this.prisma.albumMedium.findMany({
            where: {
                medium: {
                    id: idMedium,
                    status: {
                        in: ['archived', 'all']
                    }
                }
            },
            include: {
                album: true
            }
        })

        if (res === null) {
            throw new Error()
        }

        return res.map((r) => r.album)
    }

    readMediaOfAlbum = async (idAlbum: string) => {
        const res = await this.prisma.albumMedium.findMany({
            where: {
                album: {
                    id: idAlbum
                },
                medium: {
                    status: {
                        in: ['archived', 'all']
                    }
                }
            },
            include: {
                medium: {
                    include: {
                        favoredBy: true
                    }
                }
            }
        })

        return res.map((r) => r.medium) as TMedium[]
    }
}
