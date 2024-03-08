import { TUser } from '@photon/schema'
import { Field, ObjectType } from '@nestjs/graphql'
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

    @Field(() => String)
        language!: TUser['language']
}
