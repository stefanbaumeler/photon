import { PrismaClient } from '@prisma/client'

let database: PrismaClient | null = null

export const setDbUrl = () => {
    process.env.DB_URL = `postgresql://${process.env.DB_USER}:postgres@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?schema=public`
}

export const getDatabase = () => {
    if (database) {
        return database
    }

    setDbUrl()

    database = new PrismaClient()

    return database
}
