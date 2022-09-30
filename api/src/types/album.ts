export type Album = {
    id: string | number
    title: string
    description: string
    idMedium: string | number
}

export type AlbumsMedia = {
    id: string | number
    idAlbum: string | number
    idMedium: string | number
}
