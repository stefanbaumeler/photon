import { TAlbum, TMedium } from '@photon/schema'

export const isMedium = (element: TMedium | TAlbum): element is TMedium  => {
    return element.__typename === 'Medium'
}

export const isAlbum = (element: TMedium | TAlbum): element is TAlbum  => {
    return element.__typename === 'Album'
}
