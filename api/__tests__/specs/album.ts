import * as Schema from '@photon/schema'
import { predefinedAlbumUUIDs, predefinedMediumUUIDs } from '../../src/database/helpers/ids'
import { strict as assert } from 'assert'
import { useTestQuery } from '../utility'
import seed from '../../setups/seed'

beforeAll(async () => {
    await seed('test')
})

it('can be created empty', async () => {
    const query = await useTestQuery<Schema.TMCreateAlbum, Schema.TMCreateAlbumVariables>(Schema.MCreateAlbumDocument, {
        album: {
            title: 'Empty Test Album'
        }
    })

    expect(query.body.singleResult.data?.createAlbum).toMatchSnapshot({
        id: expect.any(String)
    })
})

it('can be created with media', async () => {
    const createQuery = await useTestQuery<Schema.TMCreateAlbum, Schema.TMCreateAlbumVariables>(Schema.MCreateAlbumDocument, {
        album: {
            title: 'Empty Test Album'
        },
        media: [predefinedMediumUUIDs[0], predefinedMediumUUIDs[1]]
    })

    expect(createQuery.body.singleResult.data?.createAlbum).toMatchSnapshot({
        id: expect.any(String)
    })

    const id = createQuery.body.singleResult.data?.createAlbum?.id

    assert(typeof id !== 'undefined')

    const mediaQuery = await useTestQuery<Schema.TQAlbumMedia, Schema.TQAlbumMediaVariables>(Schema.QAlbumMediaDocument, {
        id
    })

    expect(mediaQuery.body.singleResult.data?.albumMedia).toHaveLength(2)
})

it('can be updated', async () => {
    await useTestQuery<Schema.TMUpdateAlbum, Schema.TMUpdateAlbumVariables>(Schema.MUpdateAlbumDocument, {
        idAlbum: predefinedAlbumUUIDs[0],
        fields: {
            title: 'Updated Title'
        }
    })

    const isUpdatedQuery = await useTestQuery<Schema.TQAlbum, Schema.TQAlbumVariables>(Schema.QAlbumDocument, {
        id: predefinedAlbumUUIDs[0]
    })

    expect(isUpdatedQuery.body.singleResult.data?.album?.title).toBe('Updated Title')
})

it('can be deleted', async () => {
    const deleteQuery = await useTestQuery<Schema.TMDeleteAlbum, Schema.TMDeleteAlbumVariables>(Schema.MDeleteAlbumDocument, {
        ids: [predefinedAlbumUUIDs[0]]
    })

    expect(deleteQuery.body.singleResult.data?.deleteAlbum).toMatchSnapshot({
        count: 1
    })

    const isDeletedQuery = await useTestQuery<Schema.TQAlbum, Schema.TQAlbumVariables>(Schema.QAlbumDocument, {
        id: predefinedAlbumUUIDs[0]
    })

    expect(isDeletedQuery.body.singleResult.data?.album).toBeNull()
})

it('can be listed', async () => {
    const query = await useTestQuery<Schema.TQAlbums, Schema.TQAlbumsVariables>(Schema.QAlbumsDocument)

    expect(query.body.singleResult.data?.albums).not.toHaveLength(0)
})
