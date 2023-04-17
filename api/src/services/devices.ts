import { getDatabase } from '../database'
import { TDevice } from '@photon/schema'
import { Response } from 'express'

export default class DevicesService {
    prisma = getDatabase()

    constructor (public context?: { user: { id: string }, res: Response, req: Request }) {}

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
