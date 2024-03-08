import { Field, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class User {
    @Field(() => String)
        id!: string

    @Field(() => Date)
        dateCreated!: Date

    @Field(() => Date)
        dateModified!: Date

    @Field(() => String)
        mail!: string

    @Field(() => String)
        firstName!: string

    @Field(() => String)
        lastName!: string

    @Field(() => String)
        language!: string
}
