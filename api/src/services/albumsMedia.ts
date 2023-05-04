import { AlbumsMedia } from '../types'
import { DB } from '../database'

export default class AlbumsMediaService {
    createOne = async (albumMedium: Omit<AlbumsMedia, 'id'>) => {
        return DB.albumMedium.upsert({
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
        const results = await DB.$transaction(
            albumsMedia.map((albumMedium) => {
                return DB.albumMedium.upsert({
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

        return results.map(({ medium }) => medium)
    }

    removeFromAlbum = async (idAlbum: string, mediaIds: string[]) => {
        return DB.albumMedium.deleteMany({
            where: {
                idAlbum,
                idMedium: {
                    in: mediaIds
                }
            }
        })
    }

    readAlbumsOfMedium = async (idMedium: string) => {
        const res = await DB.albumMedium.findMany({
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
        const res = await DB.albumMedium.findMany({
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

        return res.map((r) => r.medium)
    }
}
