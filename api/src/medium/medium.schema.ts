import { doublePrecision, json, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

export const mediumSchema = pgTable('medium', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    hash: varchar('hash', {
        length: 255
    }),
    dateCreated: timestamp('date_created', {
        precision: 6,
        withTimezone: true,
        mode: 'string'
    }).defaultNow().notNull(),
    dateModified: timestamp('date_modified', {
        precision: 6,
        withTimezone: true,
        mode: 'string'
    }).defaultNow().notNull(),
    dateModifiedStatus: timestamp('date_modified_status', {
        precision: 6,
        withTimezone: true,
        mode: 'string'
    }).defaultNow().notNull(),
    dateTaken: timestamp('date_taken', {
        precision: 6,
        withTimezone: true,
        mode: 'string'
    }),
    filenameDisk: varchar('filename_disk', {
        length: 100
    }).notNull(),
    filenameDownload: varchar('filename_download', {
        length: 100
    }),
    title: varchar('title', {
        length: 100
    }),
    description: text('description'),
    location: doublePrecision('location').array(),
    status: text('status').default('all'),
    mimetype: varchar('mimetype', {
        length: 255
    }),
    meta: json('meta'),
    country: text('country').default(''),
    region: text('region').default(''),
    place: text('place').default(''),
    address: text('address').default(''),
    idOwner: uuid('id_owner'),
    idUploader: uuid('id_uploader')
},
(table) => {
    return {
        hashKey: uniqueIndex('medium_hash_key').on(table.hash)
    }
})
