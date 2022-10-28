const dotenv = require('dotenv')
const { knex } = require('knex')
const knexStringCase = require('knex-stringcase')

dotenv.config({
    path: process.env.NODE_ENV ? `./api/.env.${process.env.NODE_ENV}` : './api/.env'
})

const knexConfig = {
    client: 'pg',
    connection: {
        database: process.env.PG_DATABASE_NAME,
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

let database = null

const getDatabase = () => {
    if (database) {
        return database
    }

    const options = knexStringCase(knexConfig)

    database = knex(options)

    return database
}

const k = getDatabase()

k.raw('SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema()').then(({ rows }) => {
    const promises = rows
        .filter((row) => !['knex_migrations', 'knex_migrations_lock'].includes(row.tableName))
        .map((row) => row.tableName)
        .map((row) => new Promise((resolve) => {
            k.raw(`TRUNCATE TABLE ${row} CASCADE`).then(() => {
                resolve()
            })
        }))

    Promise.all(promises).then(() => {
        process.exit()
    })
})
