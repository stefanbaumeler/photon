import { ArgsType, Field } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

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
        title?: Prisma.AlbumUpdateInput['title']

    @Field(() => String, {
        nullable: true
    })
        description?: Prisma.AlbumUpdateInput['description']

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
        title: Prisma.AlbumCreateInput['title']

    @Field(() => String, {
        nullable: true
    })
        description: Prisma.AlbumCreateInput['description']

    @Field(() => [String], {
        nullable: true
    })
        media?: Prisma.AlbumCreateInput['media']
}
