import { TAlbum } from '@photon/schema'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.model'
import { Medium } from '../medium/medium.model'
@ObjectType()
export class Album {
    @Field(() => String)
        id!: TAlbum['id']

    @Field(() => Date)
        dateCreated: TAlbum['dateCreated']

    @Field(() => Date)
        dateModified: TAlbum['dateModified']

    @Field(() => String, {
        nullable: true
    })
        title!: TAlbum['title']

    @Field(() => String, {
        nullable: true
    })
        description!: TAlbum['description']

    @Field(() => Medium, {
        nullable: true
    })
        cover?: TAlbum['cover']

    @Field(() => User, {
        nullable: true
    })
        owner?: TAlbum['owner']

    @Field(() => [Medium], {
        nullable: true
    })
        media?: TAlbum['media']
}
