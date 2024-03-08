import { createUnionType } from '@nestjs/graphql'
import { ImageMeta } from './image.meta.model'
import { VideoMeta } from './video.meta.model'

export const Meta = createUnionType({
    name: 'Meta',
    types: () => [ImageMeta, VideoMeta],
    resolveType (value: VideoMeta | ImageMeta) {
        if ((value as VideoMeta).duration) {
            return VideoMeta
        }

        return ImageMeta
    }
})
