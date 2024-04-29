import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const tagSchema = pgTable('tag', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    label: text('label').notNull(),
    idUser: uuid('id_user').notNull(),
    source: text('source').default('generated').notNull()
})
