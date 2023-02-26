import { getDatabase, setDbUrl } from '../'
import usersSeed from './users'
import mediaSeed from './media'
import albumsSeed from './albums'
import { getEnv } from '../../../env'

getEnv()

setDbUrl()

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
