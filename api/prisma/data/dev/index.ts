import { db } from '../../../src/drizzle/db'

import { usersData } from './users'
import { favoritesData, mediaData } from './media'
import { albumsData, mediumToAlbumData } from './albums'
import { album, mediumToAlbum, medium, user, favorite, tag, mediumToTag } from '../../../src/drizzle/schema'
import { tagsData, mediumToTagData } from './tags'

export const devEnv = async () => {
    await db.delete(user)
    await db.insert(user).values(usersData)

    await db.delete(medium)
    await db.insert(medium).values(mediaData)

    await db.delete(favorite)
    await db.insert(favorite).values(favoritesData)

    await db.delete(tag)
    await db.insert(tag).values(tagsData)

    await db.delete(mediumToTag)
    await db.insert(mediumToTag).values(mediumToTagData)

    await db.delete(album)
    await db.insert(album).values(albumsData)

    await db.delete(mediumToAlbum)
    await db.insert(mediumToAlbum).values(mediumToAlbumData)
}
