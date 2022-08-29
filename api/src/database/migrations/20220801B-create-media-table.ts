import { Knex } from 'knex'
import { onModifiedTrigger, defaults } from '../helpers'

export async function up (knex: Knex) {
    return knex.schema.createTable('media', (t) => {
        t.uuid('id').primary().defaultTo(knex.raw(defaults.uuid))
        t.timestamp('created_at').defaultTo(knex.raw(defaults.now))
        t.timestamp('modified_at').defaultTo(knex.raw(defaults.now))
        t.string('filename_disk', 100)
        t.string('filename_download', 100)
        t.integer('width')
        t.integer('height')
        t.string('title', 100)
        t.text('description')
    }).then(() => knex.raw(onModifiedTrigger('media')))
}

export async function down (knex: Knex) {
    return knex.schema.dropTable('media')
}

