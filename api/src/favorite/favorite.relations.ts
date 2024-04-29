import { relations } from 'drizzle-orm'
import { favoriteSchema } from './favorite.schema'
import { mediumSchema } from '../medium/medium.schema'
import { userSchema } from '../user/user.schema'

export const favoriteRelations = relations(favoriteSchema, ({ one }) => ({
    medium: one(mediumSchema, {
        fields: [favoriteSchema.idMedium],
        references: [mediumSchema.id]
    }),
    user: one(userSchema, {
        fields: [favoriteSchema.idUser],
        references: [userSchema.id]
    })
}))
