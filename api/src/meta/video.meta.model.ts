import { TVideoMeta } from '@photon/schema'
import { Field, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class VideoMeta {
    @Field(() => Number)
        width!: number

    @Field(() => Number)
        height!: number

    @Field(() => Number)
        duration!: number
}
