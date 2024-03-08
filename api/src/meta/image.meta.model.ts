import { Field, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class ImageMeta {
    @Field(() => Number)
        width!: number

    @Field(() => Number)
        height!: number

    @Field(() => String)
        cameraMake!: string

    @Field(() => String)
        cameraModel!: string

    @Field(() => Number, {
        nullable: true
    })
        flash?: number

    @Field(() => Number, {
        nullable: true
    })
        fNumber?: number

    @Field(() => Number, {
        nullable: true
    })
        iso?: number

    @Field(() => String, {
        nullable: true
    })
        focalLength?: string
}
