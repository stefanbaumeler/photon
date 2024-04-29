import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

export const favoriteSchema = pgTable(
    'favorite',
    {
        idMedium: uuid('id_medium'),
        idUser: uuid('id_user')
    },
    (t) => ({
        pk: primaryKey({
            columns: [t.idMedium, t.idUser]
        })
    })
)
