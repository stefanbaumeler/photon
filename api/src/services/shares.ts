import { getDatabase } from '../database'

export default class SharesService {
    prisma = getDatabase()

    tableName = 'shares'

    async createOne () {
    }

    async readOne (key: number) {
    }
}
