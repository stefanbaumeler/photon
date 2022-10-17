export type Medium = {
    hash: number
    dateCreated: string
    dateModified: string
    dateTaken?: string
    id: string | number
    filenameDisk: string
    filenameDownload: string
    title: string
    description: string
    width: number
    height: number
    cameraMake?: string
    cameraModel?: string
    flash?: number
    fNumber?: number
    iso?: number
    lat: number | null
    lng: number | null
}
