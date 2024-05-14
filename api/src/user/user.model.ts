import { Field, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class User {
    @Field(() => String)
        id!: string

    @Field(() => String)
        dateCreated!: Date

    @Field(() => String)
        dateModified!: Date

    @Field(() => String)
        email!: string

    @Field(() => String)
        firstName!: string

    @Field(() => String)
        lastName!: string

    @Field(() => String)
        language!: string

    @Field(() => String)
        signUpToken!: string
}
