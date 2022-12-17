import { PrismaClient } from '@prisma/client'

let database: PrismaClient | null = null

export const getDatabase = () => {
    if (database) {
        return database
    }

    database = new PrismaClient()

    return database
}

export * from './schema'
