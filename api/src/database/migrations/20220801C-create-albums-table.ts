import { Knex } from 'knex'
import { defaults } from '../helpers'

export async function up (knex: Knex) {
    return Promise.all([
        knex.schema.createTable('albums', (t) => {
            t.uuid('id').primary().defaultTo(knex.raw(defaults.uuid))
            t.string('title', 100)
            t.text('description')
            t.uuid('id_medium').references('media.id')
        }),

        knex.schema.createTable('albums_media', (t) => {
            t.uuid('id').primary().defaultTo(knex.raw(defaults.uuid))
            t.uuid('id_album').references('albums.id')
            t.uuid('id_medium').references('media.id')
        })
    ])
}

export async function down (knex: Knex) {
    return Promise.all([
        knex.schema.dropTable('albums_media'),
        knex.schema.dropTable('albums')
    ])
}
