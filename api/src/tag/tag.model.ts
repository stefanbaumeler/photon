import { Field, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class Tag {
    @Field(() => String)
        id!: string

    @Field(() => String)
        label!: string

    @Field(() => String)
        source!: string

    @Field(() => String)
        idUser!: string
}
