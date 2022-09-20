import { Knex } from 'knex'
import { onModifiedTrigger, defaults } from '../helpers'

export async function up (knex: Knex) {
    return knex.schema.createTable('media', (t) => {
        t.uuid('id').primary().defaultTo(knex.raw(defaults.uuid))
        t.timestamp('date_created').defaultTo(knex.raw(defaults.now))
        t.timestamp('date_modified').defaultTo(knex.raw(defaults.now))
        t.dateTime('date_taken')
        t.string('filename_disk', 100)
        t.string('filename_download', 100)
        t.integer('width')
        t.integer('height')
        t.string('title', 100)
        t.text('description')
        t.string('camera_make', 100)
        t.string('camera_model', 100)
        t.integer('flash')
        t.float('f_number')
        t.integer('iso')
        t.float('lat')
        t.float('lng')
    }).then(() => knex.raw(onModifiedTrigger('media')))
}

export async function down (knex: Knex) {
    return knex.schema.dropTable('media')
}

