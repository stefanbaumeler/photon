import * as Schema from '@photon/schema'
import { predefinedMediumUUIDs } from '../../src/database/helpers/ids'
import seed from '../../setups/seed'
import fs from 'fs'
import path from 'path'
import { useTestQuery } from '../utility'

beforeAll(async () => {
    await seed('test')
})

it('can be listed', async () => {
    const query = await useTestQuery<Schema.TQMedia, Schema.TQMediaVariables>(Schema.QMediaDocument)

    expect(query.body.singleResult.data?.media).not.toHaveLength(0)
})

it('can be uploaded', async () => {
    // TODO
})

it('can be archived', async () => {
    // TODO
})

it('can be rotated', async () => {
    const beforeQuery = await useTestQuery<Schema.TQMedium, Schema.TQMediumVariables>(Schema.QMediumDocument, {
        id: predefinedMediumUUIDs[0]
    })

    const rotateQuery = await useTestQuery<Schema.TMRotate, Schema.TMRotateVariables>(Schema.MRotateDocument, {
        id: predefinedMediumUUIDs[0]
    })

    const beforeHeight = beforeQuery.body.singleResult.data?.medium?.meta?.height
    const afterHeight = rotateQuery.body.singleResult.data?.rotate.meta?.height

    expect(beforeHeight).toBeDefined()
    expect(afterHeight).toBeDefined()
    expect(afterHeight).not.toBe(beforeHeight)
})

it('can be deleted', async () => {
    const deleteQuery = await useTestQuery<Schema.TMDeleteMedia, Schema.TMDeleteMediaVariables>(Schema.MDeleteMediaDocument, {
        ids: [predefinedMediumUUIDs[0]]
    })

    deleteQuery.body.singleResult.data?.deleteMedia.forEach((medium) => {
        expect(medium).toMatchSnapshot({
            id: expect.any(String)
        })
    })

    const isDeletedQuery = await useTestQuery<Schema.TQMedium, Schema.TQMediumVariables>(Schema.QMediumDocument, {
        id: predefinedMediumUUIDs[0]
    })

    expect(isDeletedQuery.body.singleResult.data?.medium).toBeNull()
    expect(fs.existsSync(path.join(__dirname, '../../../uploads', predefinedMediumUUIDs[0]))).toBeFalsy()
})
