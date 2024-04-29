import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const albumSchema = pgTable('album', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    dateCreated: timestamp('date_created', {
        precision: 0,
        withTimezone: true,
        mode: 'string'
    }).defaultNow().notNull(),
    dateModified: timestamp('date_modified', {
        precision: 0,
        withTimezone: true,
        mode: 'date'
    }).defaultNow().notNull(),
    title: varchar('title', {
        length: 100
    }),
    description: text('description'),
    idCover: uuid('id_cover'),
    idOwner: uuid('id_owner')
})
