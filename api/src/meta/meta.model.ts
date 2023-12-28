import { createUnionType } from '@nestjs/graphql'
import { ImageMeta } from './image.meta.model'
import { VideoMeta } from './video.meta.model'

export const Meta = createUnionType({
    name: 'Meta',
    types: () => [ImageMeta, VideoMeta],
    resolveType (value) {
        if (value.duration) {
            return VideoMeta
        }

        return ImageMeta
    }
})
