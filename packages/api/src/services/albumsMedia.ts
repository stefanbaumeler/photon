import { AlbumsMedia } from '../types'
import { getDatabase, TMedium } from '../database'

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
        const albumsMediaPromises = albumsMedia.map(async (albumMedium) => {
            return await this.createOne(albumMedium)
        })

        return await Promise.all(albumsMediaPromises).then((results) => {
            return results.map((result) => {
                return result.medium as TMedium
            })
        })
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
