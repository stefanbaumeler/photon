import { getDatabase, TFavorite, TMedium } from '../database'

export default class FavoritesService {
    prisma = getDatabase()

    context

    constructor (context?: { user: { id: string } }) {
        this.context = context
    }

    readMany = async () => {
        const favorites = await this.prisma.favorite.findMany({
            where: {
                medium: {
                    status: {
                        not: 'trash'
                    }
                }
            },
            include: {
                medium: {
                    include: {
                        owner: true,
                        uploader: true,
                        favorites: {
                            where: {
                                user: {
                                    id: this.context?.user.id
                                }
                            }
                        }
                    }
                }
            }
        }) as TFavorite[]

        return favorites.map((favorite) => favorite.medium) as TMedium[]
    }

    createOne = async (idUser: string, idMedium: string) => {
        return await this.prisma.favorite.upsert({
            where: {
                idUser_idMedium: {
                    idUser,
                    idMedium
                }
            },
            create: {
                idUser,
                idMedium
            },
            update: {
                idUser,
                idMedium
            },
            include: {
                medium: {
                    include: {
                        owner: true,
                        uploader: true
                    }
                },
                user: true
            }
        }) as TFavorite
    }
    createMany = async (idUser: string, idMedia: string[]) => {
        const primaryKeys = idMedia.map((idMedium) => this.createOne(idUser, idMedium))

        return await Promise.all(primaryKeys).then((results) => {
            return results
        })
    }

    destroyMany = async (ids: string[]) => {
        return this.prisma.favorite.deleteMany({
            where: {
                medium: {
                    id: {
                        in: ids
                    }
                }
            }
        })
    }
}
