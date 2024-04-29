import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.model'
import { Medium } from '../medium/medium.model'
@ObjectType()
export class Album {
    @Field(() => String)
        id!: string

    @Field(() => GraphQLISODateTime)
        dateCreated!: Date

    @Field(() => GraphQLISODateTime)
        dateModified!: Date

    @Field(() => String, {
        nullable: true
    })
        title!: string

    @Field(() => String, {
        nullable: true
    })
        description?: string

    @Field(() => Medium, {
        nullable: true
    })
        cover?: Medium

    @Field(() => User)
        owner!: User

    @Field(() => [Medium], {
        nullable: true
    })
        media?: Medium
}
