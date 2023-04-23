import { getTypesense, SearchMediumProps } from './'
import MediaService from '../services/media'
import { getDatabase } from '../database'
import { TMedium } from '@photon/schema'

const reset = async () => {
    const typesense = getTypesense()

    const media = await typesense.collections('media')

    if (await media.exists()) {
        await media.delete()
    }

    await typesense.collections().create({
        name: 'media',
        fields: [
            {
                name: 'country',
                type: 'string',
                optional: true
            },
            {
                name: 'region',
                type: 'string',
                optional: true
            },
            {
                name: 'place',
                type: 'string',
                optional: true
            },
            {
                name: 'address',
                type: 'string',
                optional: true
            },
            {
                name: 'albums',
                type: 'string[]',
                facet: true
            },
            {
                name: '.*',
                type: 'auto'
            },
            {
                'name': 'is.*',
                type: 'auto',
                facet: true
            }
        ]
        // fields: [
        //     {
        //         name: 'dateTakenSort',
        //         type: 'int32',
        //         sort: true
        //     },
        //     {
        //         name: 'dateTaken',
        //         type: 'string'
        //     },
        //     {
        //         name: 'title',
        //         type: 'string'
        //     },
        //     {
        //         name: 'generatedTags',
        //         type: 'string[]',
        //         facet: true
        //     },
        //     {
        //         name: 'isFavorite',
        //         type: 'bool',
        //         facet: true
        //     },
        //     {
        //         name: 'isArchived',
        //         type: 'bool',
        //         facet: true
        //     },
        //     {
        //         name: 'isTrash',
        //         type: 'bool',
        //         facet: true
        //     },
        //     {
        //         name: 'status',
        //         type: 'string',
        //         facet: true
        //     },
        //     {
        //         name: 'location',
        //         type: 'float[]',
        //         optional: true
        //     }
        // ]
    })

    const mediaService = new MediaService()
    const documentsToSync = await mediaService.readMany()

    const database = getDatabase()

    const albumIdTransaction = await database.$transaction([...documentsToSync.map(({ id }) => {
        return database.albumMedium.findMany({
            where: {
                medium: {
                    id,
                    status: {
                        in: ['archived', 'all']
                    }
                }
            },
            select: {
                id: true,
                idAlbum: true
            }
        })
    })])

    const sync = documentsToSync.map((document, k): SearchMediumProps => {
        const albumIds = albumIdTransaction[k].map(({ idAlbum }) => idAlbum)
        return {
            ...document,
            dateTakenSort: document.dateTaken ? Math.floor(document.dateTaken.getTime() / 1000) : 0,
            favoredBy: document.favoredBy.map((fav) => fav.id) || [],
            isFavorite: !!document.favoredBy?.length,
            isArchived: document.status === 'archived',
            isTrash: document.status === 'trash',
            albums: albumIds
        }
    })

    if (sync.length) {
        await typesense.collections('media').documents().import(sync)
    }
}

export default reset
