import { getDatabase, TDevice } from '../database'
import { Response } from 'express'

export default class DevicesService {
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
        return this.prisma.device.findMany({
            where: {
                users: {
                    some: {
                        id: this.context?.user.id
                    }
                }

            }
        })
    }

    register = async (newDevice: Pick<TDevice, 'name' | 'type'>) => {
        return this.prisma.device.create({
            data: newDevice
        })
    }
}
