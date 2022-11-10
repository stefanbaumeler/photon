import { ImageMeta, Medium, VideoMeta } from '../types'

export const objectifyMeta = <T>(jsonMedium: T & Medium<unknown>[] | T & Medium<unknown>) => {
    const jsonMedia = Array.isArray(jsonMedium) ? jsonMedium : [jsonMedium]

    const res = jsonMedia.map((json) => {
        const m = json.meta as string || ''
        const meta = (typeof m === 'object' ? m : JSON.parse(m)) as ImageMeta | VideoMeta

        meta.__typename = json.mimetype.startsWith('image') ? 'ImageMeta' : 'VideoMeta'

        return {
            ...json,
            meta
        } as Medium
    })

    return res as unknown as T
}
