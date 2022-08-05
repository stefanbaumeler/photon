import { knex, Knex } from 'knex'
import knexConfig from '../../knexfile'

let database: Knex | null = null

export const getDatabase = () => {
    if (database) {
        return database
    }

    database = knex(knexConfig)

    return database
}
