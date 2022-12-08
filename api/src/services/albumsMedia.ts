import { AlbumsMedia } from '../types'
import { getDatabase } from '../database'
import { TMedium } from '@photon/shared'

export default class AlbumsMediaService {
    prisma = getDatabase()

    tableName = 'albums_media'

    createOne = async (albumMedium: Omit<AlbumsMedia, 'id'>) => {
        return this.prisma.albumMedium.upsert({
            where: {
                idAlbum_idMedium: {
                    idAlbum: albumMedium.idAlbum,
                    idMedium: albumMedium.idMedium
                }
            },
            create: albumMedium,
            update: albumMedium
        })
    }

    createMany = async (albumsMedia: Omit<AlbumsMedia, 'id'>[]) => {
        const albumsMediaPromises = albumsMedia.map(async (albumMedium) => {
            return await this.createOne(albumMedium)
        })

        return await Promise.all(albumsMediaPromises).then((results) => {
            return results
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
                idMedium
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
                idAlbum
            },
            include: {
                medium: true
            }
        })

        return res.map((r) => r.medium) as TMedium[]
    }
}
