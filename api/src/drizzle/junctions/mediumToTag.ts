import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { mediumSchema } from '../../medium/medium.schema'
import { tagSchema } from '../../tag/tag.schema'

export const mediumToTag = pgTable(
    'medium_to_tag',
    {
        idMedium: uuid('id_medium'),
        idTag: uuid('id_tag')
    },
    (t) => ({
        pk: primaryKey({
            columns: [t.idMedium, t.idTag]
        })
    })
)

export const mediumToTagRelations = relations(mediumToTag, ({ one }) => ({
    medium: one(mediumSchema, {
        fields: [mediumToTag.idMedium],
        references: [mediumSchema.id]
    }),
    tag: one(tagSchema, {
        fields: [mediumToTag.idTag],
        references: [tagSchema.id]
    })
}))
