import { PrismaClient } from '@prisma/client'
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const setDbUrl = () => {
    process.env.DB_URL = `postgresql://${process.env.DB_USER}:postgres@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?schema=public`
}

export const getDatabase = () => {
    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma
    }

    globalForPrisma.prisma = new PrismaClient()

    setDbUrl()

    return globalForPrisma.prisma
}

export const DB = getDatabase()
