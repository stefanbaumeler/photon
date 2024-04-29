import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const userSchema = pgTable('user', {
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
    mail: varchar('mail', {
        length: 255
    }).notNull(),
    password: varchar('password', {
        length: 255
    }).notNull(),
    firstName: varchar('first_name', {
        length: 255
    }).notNull(),
    lastName: varchar('last_name', {
        length: 255
    }).notNull(),
    language: text('language').notNull(),
    datePasswordResetTokenExpiration: timestamp('date_password_reset_token_expiration', {
        precision: 3,
        mode: 'string'
    }),
    passwordResetToken: text('password_reset_token').default(''),
    signUpToken: text('sign_up_token').default('')
})
