export type Medium = {
    date_created: string
    date_modified: string
    date_taken?: string
    id: string | number
    filename_disk: string
    filename_download: string
    title: string
    description: string
    width: number
    height: number
    camera_make?: string
    camera_model?: string
    flash?: number
    f_number?: number
    iso?: number
    lat: number | null
    lng: number | null
}
