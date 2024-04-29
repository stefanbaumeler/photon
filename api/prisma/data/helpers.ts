import { mediumToAlbum, mediumToTag, tag } from '../../src/drizzle/schema'

export const connectIds = (ids: string[]) => {
    return {
        connect: ids.map((id) => {
            return {
                id
            }
        })
    }
}

export const connectId = (id: string) => {
    return {
        connect: {
            id
        }
    }
}

export const defaultUser = '51dde765-a6de-48c6-b372-41534fb91d55'

export const connectDefaultUser = () => {
    return {
        connect: {
            id: '51dde765-a6de-48c6-b372-41534fb91d55'
        }
    }
}

export const createTags = (idMedium: string, tagsData: typeof tag.$inferInsert[], labels: string[]): typeof mediumToTag.$inferInsert[] => {
    return labels.map((label) => ({
        idMedium,
        idTag: tagsData.find((tag) => {
            // console.log(tag.label === label, tag.label, label)
            return tag.label === label
        }).id
    }))
}

export const createAlbumWithMedia = (idAlbum: string, media: string[]): typeof mediumToAlbum.$inferInsert[] => {
    return media.map((idMedium) => ({
        idMedium,
        idAlbum
    }))
}
