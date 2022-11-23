import { Knex } from 'knex'
import { defaults, onUserDeletedUpdateMediaOwner, onModifiedTrigger } from '../helpers'

export async function up (knex: Knex) {
    return Promise.all([
        knex.schema.createTable('users', (t) => {
            t.uuid('id').primary().defaultTo(knex.raw(defaults.uuid))
            t.timestamp('date_created').defaultTo(knex.raw(defaults.now))
            t.timestamp('date_modified').defaultTo(knex.raw(defaults.now))
            t.string('mail')
            t.string('password')
            t.string('first_name')
            t.string('last_name')
        })
    ]).then(() => knex.raw(onModifiedTrigger('users')))
        .then(() => knex.raw(onUserDeletedUpdateMediaOwner()))
}

export async function down (knex: Knex) {
    return Promise.all([
        knex.schema.dropTable('users')
    ])
}
