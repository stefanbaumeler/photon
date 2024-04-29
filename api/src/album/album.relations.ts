import { relations } from 'drizzle-orm'
import { albumSchema } from './album.schema'
import { mediumSchema } from '../medium/medium.schema'
import { userSchema } from '../user/user.schema'
import { mediumToAlbum } from '../drizzle/junctions/mediumToAlbum'

export const albumRelations = relations(albumSchema, ({
    one, many
}) => ({
    cover: one(mediumSchema, {
        fields: [albumSchema.idCover],
        references: [mediumSchema.id]
    }),
    owner: one(userSchema, {
        fields: [albumSchema.idOwner],
        references: [userSchema.id]
    }),
    media: many(mediumToAlbum)
}))
