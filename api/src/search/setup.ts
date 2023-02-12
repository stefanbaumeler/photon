import { getTypesense, SearchMedium } from './'
import MediaService from '../services/media'
import AlbumsService from '../services/albums'
import AlbumsMediaService from '../services/albumsMedia'
import { EMediumStatus } from '@photon/app/src/types/app'

const setup = async () => {
    const typesense = getTypesense()

    const media = await typesense.collections('media')

    if (await media.exists()) {
        await media.delete()
    }

    await typesense.collections().create({
        name: 'media',
        fields: [
            {
                name: 'id',
                type: 'string'
            },
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
            }
        ]
    })

    const mediaService = new MediaService()
    const albumsMediaService = new AlbumsMediaService()
    const documentsToSync = await mediaService.readMany()

    const promises = documentsToSync.map((document) => new Promise<SearchMedium>((resolve) => {
        albumsMediaService.readAlbumsOfMedium(document.id).then((albums) => {
            const albumIds = albums.map((album) => album.id)

            resolve({
                id: document.id,
                title: document.title,
                dateTakenSort: Math.floor(document.dateTaken.getTime() / 1000),
                dateTaken: document.dateTaken,
                generatedTags: document.generatedTags,
                meta: document.meta,
                mimetype: document.mimetype,
                filenameDisk: document.filenameDisk,
                status: document.status,
                favoredBy: document.favoredBy,
                isFavorite: !!document.favoredBy?.length,
                isArchived: document.status === EMediumStatus.ARCHIVED,
                isTrash: document.status === EMediumStatus.TRASH,
                albums: albumIds
            } as SearchMedium)
        })
    }))

    Promise.all(promises).then(async (data) => {
        await typesense.collections('media').documents().import(data)
    })
}

export default setup()
