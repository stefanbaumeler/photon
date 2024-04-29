import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { albumSchema } from '../../album/album.schema'
import { mediumSchema } from '../../medium/medium.schema'

export const mediumToAlbum = pgTable(
    'medium_to_album',
    {
        idMedium: uuid('id_medium'),
        idAlbum: uuid('id_album')
    },
    (t) => ({
        pk: primaryKey({
            columns: [t.idMedium, t.idAlbum]
        })
    })
)

export const mediumToAlbumRelations = relations(mediumToAlbum, ({ one }) => ({
    medium: one(mediumSchema, {
        fields: [mediumToAlbum.idMedium],
        references: [mediumSchema.id]
    }),
    album: one(albumSchema, {
        fields: [mediumToAlbum.idAlbum],
        references: [albumSchema.id]
    })
}))
