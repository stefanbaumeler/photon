import { TMedium } from '@photon/schema'
import { Field, ObjectType, Float } from '@nestjs/graphql'
import { User } from '../user/user.model'
import { Meta } from '../meta/meta.model'
import { Tag } from '../tag/tag.model'
import { ImageMeta } from '../meta/image.meta.model'
import { VideoMeta } from '../meta/video.meta.model'

@ObjectType()
export class Medium {
    @Field(() => String!)
        id!: string

    @Field(() => Date)
        dateCreated!: Date

    @Field(() => Date)
        dateModified!: Date

    @Field(() => Date)
        dateModifiedStatus!: Date

    @Field(() => Date)
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

    @Field(() => User)
        owner!: User

    @Field(() => User)
        uploader!: User

    @Field(() => String, {
        nullable: true
    })
        hash?: string

    @Field(() => [User], {
        nullable: true
    })
        favoredBy?: User[]

    @Field(() => [Tag])
        tags!: Tag[]

    @Field(() => String)
        country!: string

    @Field(() => String)
        region!: string

    @Field(() => String)
        place!: string

    @Field(() => String)
        address!: string
}
