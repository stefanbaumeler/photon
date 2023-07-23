import { TAlbum, TMedium } from '@photon/schema'

export const isAlbums = (elements: (TAlbum | TMedium)[]): elements is TAlbum[] => {
    return !elements.find((element) => !isAlbum(element))
}

export const isMedia = (elements: (TAlbum | TMedium)[]): elements is TMedium[] => {
    return !elements.find((element) => !isMedium(element))
}

export const isMedium = (element: TMedium | TAlbum): element is TMedium  => {
    return element.__typename === 'Medium'
}

export const isAlbum = (element: TMedium | TAlbum): element is TAlbum  => {
    return element.__typename === 'Album'
}
