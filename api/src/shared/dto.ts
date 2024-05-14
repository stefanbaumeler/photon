import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql'

@ArgsType()
@ObjectType()
export class IdDto {
    @Field(() => String)
        id!: string
}

@ArgsType()
export class IdsDto {
    @Field(() => [String])
        ids!: string[]
}
