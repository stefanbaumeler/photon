import { getDatabase, TFavorite } from '../database'
import { Prisma } from '.prisma/client'

export default class FavoritesService {
    prisma = getDatabase()

    readMany = async (conditions: Prisma.FavoriteWhereInput) => {
        return await this.prisma.favorite.findMany({
            where: conditions,
            include: {
                user: true,
                medium: true
            }
        }) as TFavorite[]
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
