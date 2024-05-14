import { Field, ObjectType, Float, ArgsType } from '@nestjs/graphql'
import { User } from '../user/user.model'
import { Meta } from '../meta/meta.model'
import { Tag } from '../tag/tag.model'
import { ImageMeta } from '../meta/image.meta.model'
import { VideoMeta } from '../meta/video.meta.model'

@ArgsType()
@ObjectType()
export class FlatMedium {
    @Field(() => String!)
        id!: string

    @Field(() => String)
        dateCreated!: Date

    @Field(() => String)
        dateModified!: Date

    @Field(() => String)
        dateModifiedStatus!: Date

    @Field(() => String)
        dateTaken!: Date

    @Field(() => String)
        filenameDisk!: string

    @Field(() => String)
        filenameDownload!: string

    @Field(() => String)
        title!: string

    @Field(() => String, {
        nullable: true
    })
        description?: string

    @Field(() => [Float])
        location!: number[]

    @Field(() => String)
        status!: string

    @Field(() => String)
        mimetype!: string

    @Field(() => Meta)
        meta!: ImageMeta | VideoMeta

    @Field(() => String, {
        nullable: true
    })
        hash?: string

    @Field(() => String)
        country!: string

    @Field(() => String)
        region!: string

    @Field(() => String)
        place!: string

    @Field(() => String)
        address!: string
}

@ArgsType()
@ObjectType()
export class Medium extends FlatMedium {
    @Field(() => User)
        owner!: User

    @Field(() => User)
        uploader!: User

    @Field(() => [Tag])
        tags!: Tag[]

    @Field(() => [User], {
        nullable: true
    })
        favoredBy?: User[]
}

@ArgsType()
@ObjectType()
export class MediumId {
    @Field(() => String)
        id!: string
}
