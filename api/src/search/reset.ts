import { getTypesense, SearchMedium } from './'
import MediaService from '../services/media'
import { getDatabase } from '../database'

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
                name: 'dateTakenSort',
                type: 'int32',
                sort: true
            },
            {
                name: 'dateTaken',
                type: 'string'
            },
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'generatedTags',
                type: 'string[]',
                facet: true
            },
            {
                name: 'isFavorite',
                type: 'bool',
                facet: true
            },
            {
                name: 'isArchived',
                type: 'bool',
                facet: true
            },
            {
                name: 'isTrash',
                type: 'bool',
                facet: true
            },
            {
                name: 'status',
                type: 'string',
                facet: true
            },
            {
                name: 'albums',
                type: 'string[]',
                facet: true
            },
            {
                name: 'country',
                type: 'string',
                facet: true
            },
            {
                name: 'region',
                type: 'string',
                facet: true
            },
            {
                name: 'place',
                type: 'string',
                facet: true
            },
            {
                name: 'address',
                type: 'string',
                facet: true
            }
        ]
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

    const sync = documentsToSync.map((document, k) => {
        const albumIds = albumIdTransaction[k].map(({ idAlbum }) => idAlbum)
        const location = Array.isArray(document.location) ? document.location : JSON.parse(document.location as unknown as string) as string[]

        console.log(document.country || '')
        return {
            id: document.id,
            title: document.title,
            dateTakenSort: Math.floor(document.dateTaken.getTime() / 1000),
            dateTaken: document.dateTaken,
            generatedTags: document.generatedTags,
            meta: document.meta,
            mimetype: document.mimetype,
            filenameDisk: document.filenameDisk,
            filenameDownload: document.filenameDownload,
            status: document.status,
            favoredBy: document.favoredBy || null,
            isFavorite: !!document.favoredBy?.length,
            isArchived: document.status === 'archived',
            isTrash: document.status === 'trash',
            location: location.map((c) => typeof c === 'number' ? c : 0),
            country: document.country || '',
            region: document.region || '',
            place: document.place || '',
            address: document.address || '',
            albums: albumIds
        } as unknown as SearchMedium
    })

    if (sync.length) {
        await typesense.collections('media').documents().import(sync)
    }
}

export default reset
