export const getDetailsUrl = (parentUrl: string, idMedium: string, idAlbum?: string) => {
    const parent = parentUrl?.endsWith('/') ? parentUrl?.slice(0, -1) : parentUrl

    let newUrl = `${parent}/media/${idMedium}`

    if (idAlbum) {
        newUrl = `/albums/${idAlbum}/${idMedium}`
    }

    if (parent?.includes('favorites')) {
        newUrl = `${parent}/${idMedium}`
    }

    if (parent?.includes('archive')) {
        newUrl = `${parent}/${idMedium}`
    }

    if (parent?.includes('trash')) {
        newUrl = `${parent}/${idMedium}`
    }

    return newUrl
}

export const getParentUrl = (pathname: string, album?: string) => {
    let parent = '/'

    if (pathname.startsWith('/archive')) {
        parent = '/archive'
    }

    if (pathname.startsWith('/trash')) {
        parent = '/trash'
    }

    if (pathname.startsWith('/favorites')) {
        parent = '/favorites'
    }

    if (pathname.startsWith('/albums')) {
        parent = `/albums/${album}/`
    }

    return parent
}
