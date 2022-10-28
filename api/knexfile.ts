import dotenv from 'dotenv'

dotenv.config({
    path: process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : './.env'
})

export default {
    client: 'pg',
    connection: {
        database: process.env.PG_DATABASE_NAME || '',
        userName: process.env.PG_DATABASE_USER,
        uri: process.env.PG_DATABASE_URI,
        port: parseInt(process.env.PG_DATABASE_PORT || '5432', 10),
        password: process.env.PG_DATABASE_PASSWORD
    },
    searchPath: ['knex', 'public'],
    migrations: {
        directory: './src/database/migrations'
    },
    seeds: {
        directory: './src/database/seeds'
    }
}
