import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const deviceSchema = pgTable('device', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
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
    name: text('name').notNull(),
    type: text('type').notNull()
})
