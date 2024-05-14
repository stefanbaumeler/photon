import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.model'
import { FlatMedium } from '../medium/medium.model'

@ObjectType()
export class FlatAlbum {
    @Field(() => String)
        id!: string

    @Field(() => String)
        dateCreated!: Date

    @Field(() => String)
        dateModified!: Date

    @Field(() => String, {
        nullable: true
    })
        title!: string

    @Field(() => String, {
        nullable: true
    })
        description?: string
}

@ObjectType()
export class Album extends FlatAlbum {
    @Field(() => FlatMedium, {
        nullable: true
    })
        cover?: FlatMedium

    @Field(() => User)
        owner!: User

    @Field(() => [FlatMedium], {
        nullable: true
    })
        media?: FlatMedium[]
}
