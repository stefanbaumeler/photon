import { TDevice } from '@photon/schema'
import { Response } from 'express'
import { DB } from '../database'

export default class DevicesService {
    constructor (public context?: { user: { id: string }, res: Response, req: Request }) {}

    readMany = async () => {
        return DB.device.findMany({
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
        return DB.device.create({
            data: newDevice
        })
    }
}
