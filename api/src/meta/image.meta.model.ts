import { TImageMeta } from '@photon/schema'
import { Field, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class ImageMeta {
    @Field(() => Number)
        width!: TImageMeta['width']

    @Field(() => Number)
        height!: TImageMeta['height']

    @Field(() => String)
        cameraMake!: TImageMeta['cameraMake']

    @Field(() => String)
        cameraModel!: TImageMeta['cameraModel']

    @Field(() => Number, {
        nullable: true
    })
        flash?: TImageMeta['flash']

    @Field(() => Number, {
        nullable: true
    })
        fNumber?: TImageMeta['fNumber']

    @Field(() => Number, {
        nullable: true
    })
        iso?: TImageMeta['iso']

    @Field(() => String, {
        nullable: true
    })
        focalLength?: TImageMeta['focalLength']
}
