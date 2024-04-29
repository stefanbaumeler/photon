import { relations } from 'drizzle-orm'
import { mediumSchema } from './medium.schema'
import { userSchema } from '../user/user.schema'
import { favoriteSchema } from '../favorite/favorite.schema'
import { mediumToTag } from '../drizzle/junctions/mediumToTag'
import { mediumToAlbum } from '../drizzle/junctions/mediumToAlbum'

export const mediumRelations = relations(mediumSchema, ({
    one, many
}) => ({
    owner: one(userSchema, {
        fields: [mediumSchema.idOwner],
        references: [userSchema.id]
    }),
    uploader: one(userSchema, {
        fields: [mediumSchema.idUploader],
        references: [userSchema.id]
    }),
    favoredBy: many(favoriteSchema),
    albums: many(mediumToAlbum),
    coverOfAlbums: many(mediumSchema),
    tags: many(mediumToTag)
}))
