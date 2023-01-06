// import { getDatabase, setDbUrl } from '../'
// import usersSeed from './users'
// import mediaSeed from './media'
// import albumsSeed from './albums'
// import { getEnv } from '../../../env'
// import { PrismaClient } from '@prisma/client'
//
// getEnv()
//
// setDbUrl()
//
// const prisma = getDatabase()
//
// const run = async () => {
//     try {
//         const prisma = new PrismaClient()
//
//         const tableNames = await prisma.$queryRaw<
//             Array<{ tablename: string }>
//             >`SELECT tablename FROM pg_tables WHERE schemaname='public'`
//
//         const tables = tableNames
//             .filter((table) => table.tablename !== '_prisma_migrations')
//             .map((name) => `"public"."${name}"`)
//             .join(', ')
//
//         try {
//             await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
//         } catch (error) {
//             console.log({
//                 error
//             })
//         }
//
//         await usersSeed()
//         await mediaSeed()
//         await albumsSeed()
//     } catch (e) {
//         console.error(e)
//         await prisma.$disconnect()
//     }
//
//     return true
// }
//
// export const seed = async () => {
//     await run()
// }

import { getDatabase, setDbUrl } from '../'
import usersSeed from './users'
import mediaSeed from './media'
import albumsSeed from './albums'
import { getEnv } from '../../../env'

getEnv()

setDbUrl()

const run = async () => {
    const prisma = getDatabase()

    const tableNames = await prisma.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    const tables = tableNames
        .filter((table) => table.tablename !== '_prisma_migrations')
        .map((table) => `"public"."${table.tablename}"`)
        .join(', ')

    try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
    } catch (error) {
        console.log({
            error
        })
    }

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

export const seed = async () => {
    await run()
}
