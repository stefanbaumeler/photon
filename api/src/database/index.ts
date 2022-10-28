import { knex, Knex } from 'knex'
import knexConfig from '../../knexfile'
import knexStringCase from 'knex-stringcase'

let database: Knex | null = null

export const getDatabase = () => {
    if (database) {
        return database
    }

    const options = knexStringCase(knexConfig)

    console.log(options)

    database = knex(options)

    return database
}
