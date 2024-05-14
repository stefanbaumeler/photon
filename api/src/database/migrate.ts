import { client, db } from '../drizzle/db'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { resolve } from 'node:path'

async function runMigrations () {
    await client.connect()
    await migrate(db, {
        migrationsFolder: resolve(__dirname, '../../src/drizzle')
    })

    await client.end()
}

runMigrations()
