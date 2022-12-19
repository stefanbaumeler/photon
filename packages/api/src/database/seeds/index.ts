import dotenv from 'dotenv'
import { getDatabase, setDbUrl } from '../index'

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
    override: true
})

setDbUrl()

import usersSeed from './users'
import mediaSeed from './media'
import albumsSeed from './albums'

const prisma = getDatabase()

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
