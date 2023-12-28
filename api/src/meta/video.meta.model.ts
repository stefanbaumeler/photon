import { TVideoMeta } from '@photon/schema'
import { Field, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class VideoMeta {
    @Field(() => Number)
        width!: TVideoMeta['width']

    @Field(() => Number)
        height!: TVideoMeta['height']

    @Field(() => Number)
        duration!: TVideoMeta['duration']
}
