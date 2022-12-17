import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

import usersSeed from './users'
import mediaSeed from './media'
import albumsSeed from './albums'

const prisma = new PrismaClient()

const run = async () => {
    try {
        await usersSeed()
        await mediaSeed()
        await albumsSeed()
    }
    catch (e) {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }

    return true
}

run().then(() => {
    process.exit()
})
