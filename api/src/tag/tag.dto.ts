import { ArgsType, Field } from "@nestjs/graphql"

@ArgsType()
export class TagsInsertDto {
    @Field(() => [String])
    tags: string[]

    @Field(() => String)
    idUser: string

    @Field(() => String)
    idMedium: string

    @Field(() => String, {
        nullable: true
    })
    source?: string
}