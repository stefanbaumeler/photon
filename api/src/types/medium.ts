export type Medium<T = VideoMeta | ImageMeta> = {
    hash: number
    dateCreated: string
    dateModified: string
    dateModifiedStatus: string
    dateTaken?: string
    id: string | number
    filenameDisk: string
    filenameDownload: string
    title: string
    description: string
    lat: number | null
    lng: number | null
    status: string
    mimetype: string
    meta?: T
}

export type VideoMeta = {
    __typename?: string
    duration: number
    width: number
    height: number
}

export type ImageMeta = {
    __typename?: string
    width: number
    height: number
    cameraMake?: string
    cameraModel?: string
    flash?: number
    fNumber?: number
    iso?: number
}
