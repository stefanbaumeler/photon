import 'dotenv/config'
import type { Config } from 'drizzle-kit'
export default {
    driver: 'pg',
    out: './src/drizzle',
    schema: './src/drizzle/schema.ts',
    dbCredentials: {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!
    },
    verbose: true,
    strict: true
} satisfies Config
