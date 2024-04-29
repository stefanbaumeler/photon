import { relations } from 'drizzle-orm'
import { mediumSchema } from '../medium/medium.schema'
import { albumSchema } from '../album/album.schema'
import { userToDevice } from '../drizzle/junctions/userToDevice'
import { favoriteSchema } from '../favorite/favorite.schema'
import { tagSchema } from '../tag/tag.schema'

export const userRelations = relations(mediumSchema, ({ many }) => ({
    media: many(mediumSchema),
    uploadedMedia: many(mediumSchema),
    albums: many(albumSchema),
    devices: many(userToDevice),
    favorites: many(favoriteSchema),
    createdTags: many(tagSchema)
}))
