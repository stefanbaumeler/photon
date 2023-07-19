import { useTestQuery } from '../utility'
import * as Schema from '@photon/schema'
import { seed } from '../../prisma/seed'
import { predefinedFavoriteUUIDs, predefinedMediumUUIDs } from '../../src/database/helpers/ids'

beforeAll(async () => {
    await seed('test')
})

it('can be listed', async () => {
    const query = await useTestQuery<Schema.TQFavorites, Schema.TQFavorites>(Schema.QFavoritesDocument)

    expect(query.body.singleResult.data?.favorites).not.toHaveLength(0)
})

it('can be added', async () => {
    const beforeQuery = await useTestQuery<Schema.TQFavorites, Schema.TQFavorites>(Schema.QFavoritesDocument)
    const addQuery = await useTestQuery<Schema.TMAddToFavorites, Schema.TMAddToFavoritesVariables>(Schema.MAddToFavoritesDocument, {
        media: [predefinedMediumUUIDs[4]]
    })

    const beforeCount = beforeQuery.body.singleResult.data?.favorites.length
    const afterCount = addQuery.body.singleResult.data?.addToFavorites.length

    expect(beforeCount).toBeDefined()
    expect(afterCount).toBeDefined()
    expect(afterCount).not.toBe(beforeCount)
})

it('can be removed', async () => {
    const beforeQuery = await useTestQuery<Schema.TQFavorites, Schema.TQFavorites>(Schema.QFavoritesDocument)
    const removeQuery = await useTestQuery<Schema.TMRemoveFromFavorites, Schema.TMRemoveFromFavoritesVariables>(Schema.MRemoveFromFavoritesDocument, {
        media: [predefinedFavoriteUUIDs[0]]
    })

    const beforeCount = beforeQuery.body.singleResult.data?.favorites.length
    const afterCount = removeQuery.body.singleResult.data?.removeFromFavorites.length

    expect(beforeCount).toBeDefined()
    expect(afterCount).toBeDefined()
    expect(beforeCount).not.toBe(afterCount)
})
