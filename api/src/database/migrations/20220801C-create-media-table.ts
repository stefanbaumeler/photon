import { Knex } from 'knex'
import { onModifiedTrigger, defaults } from '../helpers'

export async function up (knex: Knex) {
    return knex.schema.createTable('media', (t) => {
        t.uuid('id').primary().defaultTo(knex.raw(defaults.uuid))
        t.bigint('hash')
        t.timestamp('date_created').defaultTo(knex.raw(defaults.now))
        t.timestamp('date_modified').defaultTo(knex.raw(defaults.now))
        t.timestamp('date_modified_status').defaultTo(knex.raw(defaults.now))
        t.dateTime('date_taken')
        t.string('filename_disk', 100)
        t.string('filename_download', 100)
        t.string('title', 100)
        t.text('description')
        t.float('lat')
        t.float('lng')
        t.enum('status', ['default', 'archived', 'trash']).defaultTo('default')
        t.string('mimetype')
        t.jsonb('meta')
        t.uuid('owner').references('users.id').onDelete('CASCADE')
        t.uuid('uploader').references('users.id').onDelete('NO ACTION')
    }).then(() => knex.raw(onModifiedTrigger('media')))
}

export async function down (knex: Knex) {
    return knex.schema.dropTable('media')
}

