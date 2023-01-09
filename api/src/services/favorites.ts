import { getDatabase, TMedium } from '../database'
import { Response } from 'express'

export default class FavoritesService {
    prisma = getDatabase()

    context

    constructor (context?: { user: { id: string }, res: Response, req: Request }) {
        this.context = context
    }

    truncate = async () => {
        return this.prisma.user.deleteMany({
            where: {}
        })
    }

    readMany = async () => {
        const res = await this.prisma.user.findFirst({
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

        return res.favorites as TMedium[]
    }

    create = async (idMedia: string[]) => {
        const idMediaArray = Array.isArray(idMedia) ? idMedia : [idMedia]

        const updatedUser = await this.prisma.user.update({
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

        return updatedUser.favorites as TMedium[]
    }

    remove = async (idMedia: string[] | string) => {
        const idMediaArray = Array.isArray(idMedia) ? idMedia : [idMedia]

        const updatedUser = await this.prisma.user.update({
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

        return updatedUser.favorites as TMedium[]
    }
}
