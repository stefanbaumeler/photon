// import usersSeed from './seeds/users'
import mediaSeed from './seeds/media'
import albumsSeed from './seeds/albums'
import { getDatabase } from './index'
import { getEnv } from '../../env'

getEnv()

const prisma = getDatabase()

const run = async () => {
    try {
        // await usersSeed(true)
        await mediaSeed(true)
        await albumsSeed(true)
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
