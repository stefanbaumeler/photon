import { Response } from 'express'
import { DB } from '../database'

export default class FavoritesService {
    constructor (public context?: { user: { id: string }, res: Response, req: Request }) {}

    readMany = async () => {
        const res = await DB.user.findFirst({
            where: {
                id: this.context?.user.id
            },
            include: {
                favorites: {
                    include: {
                        owner: true,
                        uploader: true
                    }
                }
            }
        })

        if (res === null) {
            throw new Error()
        }

        return res.favorites
    }

    create = async (idMedia: string[]) => {
        const idMediaArray = Array.isArray(idMedia) ? idMedia : [idMedia]

        const updatedUser = await DB.user.update({
            where: {
                id: this.context?.user.id
            },
            data: {
                favorites: {
                    connect: idMediaArray.map((id) => ({
                        id
                    }))
                }
            },
            include: {
                favorites: {
                    include: {
                        owner: true,
                        uploader: true
                    }
                }
            }
        })

        return updatedUser.favorites
    }

    remove = async (idMedia: string[] | string) => {
        const idMediaArray = Array.isArray(idMedia) ? idMedia : [idMedia]

        const updatedUser = await DB.user.update({
            where: {
                id: this.context?.user.id
            },
            data: {
                favorites: {
                    disconnect: idMediaArray.map((id) => ({
                        id
                    }))
                }
            },
            include: {
                favorites: {
                    include: {
                        owner: true,
                        uploader: true
                    }
                }
            }
        })

        return updatedUser.favorites
    }
}
