import { TUser } from '@photon/schema'
import { Field, ObjectType } from '@nestjs/graphql'
import { Medium } from '../medium/medium.model'
@ObjectType()
export class User {
    @Field(() => String)
        id!: TUser['id']

    @Field(() => Date)
        dateCreated: TUser['dateCreated']

    @Field(() => Date)
        dateModified: TUser['dateModified']

    @Field(() => String)
        mail!: TUser['mail']

    @Field(() => String)
        firstName!: TUser['firstName']

    @Field(() => String)
        lastName!: TUser['lastName']

    @Field(() => Medium)
        favorites!: TUser['favorites']

    @Field(() => String)
        language!: TUser['language']
}
