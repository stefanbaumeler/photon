import { ArgsType, Field, InputType } from '@nestjs/graphql'

@InputType()
@ArgsType()
export class IdDto {
    @Field(() => String)
        id!: string
}

@InputType()
@ArgsType()
export class IdsDto {
    @Field(() => [String])
        ids!: string[]
}
