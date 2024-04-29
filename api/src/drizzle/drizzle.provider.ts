import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const DrizzleAsyncProvider = 'drizzleProvider'
export const drizzleProvider = [
    {
        provide: DrizzleAsyncProvider,
        useFactory: async () => {
            const client = new Client({
                host: process.env.DB_HOST!,
                port: Number(process.env.DB_PORT!),
                user: process.env.DB_USER!,
                password: process.env.DB_PASSWORD!,
                database: process.env.DB_DATABASE!
            })

            await client.connect()

            return drizzle(client, {
                schema
            })
        },
        exports: [DrizzleAsyncProvider]
    }
]
