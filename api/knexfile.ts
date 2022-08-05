import dotenv from 'dotenv'

dotenv.config()

export default {
    client: 'pg',
    connection: {
        database: process.env.PG_DATABASE_NAME || '',
        userName: process.env.PG_DATABASE_USER,
        uri: process.env.PG_DATABASE_URI,
        port: parseInt(process.env.PG_DATABASE_PORT || '5432', 10)
    },
    searchPath: ['knex', 'public'],
    migrations: {
        directory: './src/database/migrations'
    }
}

