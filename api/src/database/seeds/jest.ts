import { getDatabase, setDbUrl } from '../'
import usersSeed from './users'
import mediaSeed from './media'
import albumsSeed from './albums'
import { getEnv } from '../../../env'
import reset from '../../search/reset'

getEnv()

setDbUrl()

export const seed = async () => {
    const prisma = getDatabase()

    await truncate()

    try {
        await usersSeed()
        await mediaSeed()
        await albumsSeed()
    }
    catch (e) {
        console.error(e)
        await prisma.$disconnect()
    }

    return true
}

export const truncate = async () => {
    const prisma = getDatabase()

    const tableNames = await prisma.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    const tables = tableNames
        .filter((table) => table.tablename !== '_prisma_migrations')
        .map((table) => `"public"."${table.tablename}"`)
        .join(', ')

    try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
        await reset()
    } catch (error) {
        console.log({
            error
        })
    }
}
