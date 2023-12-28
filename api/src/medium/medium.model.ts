import { TMedium } from '@photon/schema'
import { Field, ObjectType, Float } from '@nestjs/graphql'
import { User } from '../user/user.model'
import { Meta } from '../meta/meta.model'
import { Tag } from '../tag/tag.model'
@ObjectType()
export class Medium {
    @Field(() => String)
        id!: TMedium['id']

    @Field(() => Date)
        dateCreated: TMedium['dateCreated']

    @Field(() => Date)
        dateModified: TMedium['dateModified']

    @Field(() => Date)
        dateModifiedStatus: TMedium['dateModifiedStatus']

    @Field(() => Date)
        dateTaken: TMedium['dateTaken']

    @Field(() => String)
        filenameDisk!: TMedium['filenameDisk']

    @Field(() => String)
        filenameDownload!: TMedium['filenameDownload']

    @Field(() => String)
        title!: TMedium['title']

    @Field(() => String, {
        nullable: true
    })
        description?: TMedium['description']

    @Field(() => [Float])
        location!: TMedium['location']

    @Field(() => String)
        status!: TMedium['status']

    @Field(() => String)
        mimetype!: TMedium['mimetype']

    @Field(() => Meta)
        meta!: TMedium['meta']

    @Field(() => User)
        owner!: TMedium['owner']

    @Field(() => User)
        uploader!: TMedium['uploader']

    @Field(() => String)
        hash!: TMedium['hash']

    @Field(() => [User], {
        nullable: true
    })
        favoredBy?: TMedium['favoredBy']

    @Field(() => [Tag])
        tags!: TMedium['tags']

    @Field(() => String)
        country!: TMedium['country']

    @Field(() => String)
        region!: TMedium['region']

    @Field(() => String)
        place!: TMedium['place']

    @Field(() => String)
        address!: TMedium['address']
}
