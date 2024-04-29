import { relations } from 'drizzle-orm'
import { tagSchema } from './tag.schema'
import { userSchema } from '../user/user.schema'
import { mediumToTag } from '../drizzle/junctions/mediumToTag'

export const tagRelations = relations(tagSchema, ({
    one, many
}) => ({
    user: one(userSchema, {
        fields: [tagSchema.idUser],
        references: [userSchema.id]
    }),
    media: many(mediumToTag)
}))
