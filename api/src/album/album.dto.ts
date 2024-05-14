import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class AlbumMediaDto {
    @Field(() => String)
        id!: string

    @Field(() => [String])
        media!: string[]
}

@ArgsType()
export class AlbumUpdateDto {
    @Field(() => String!)
        id!: string

    @Field(() => String, {
        nullable: true
    })
        title?: string

    @Field(() => String, {
        nullable: true
    })
        description?: string

    @Field(() => String, {
        nullable: true
    })
        cover?: string
}

@ArgsType()
export class AlbumCreateDto {
    @Field(() => String, {
        nullable: true
    })
        title: string

    @Field(() => String, {
        nullable: true
    })
        description: string

    @Field(() => [String], {
        nullable: true
    })
        media?: string[]

    @Field(() => String, {
        nullable: true
    })
        cover?: string
}
