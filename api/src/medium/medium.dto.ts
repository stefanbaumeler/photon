import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal'
import { Medium } from './medium.model'

@InputType()
@ArgsType()
export class MediumFilenameDiskDto {
    @Field(() => String)
        filenameDisk!: Medium['filenameDisk']
}

@InputType()
@ArgsType()
export class MediumStatusDto {
    @Field(() => String)
        status!: Medium['status']
}

@ObjectType()
export class MediumDownloadDto {
    @Field(() => String)
        url!: string
}

@ObjectType()
class MediumCountMonth {
    @Field(() => Int)
        month!: number

    @Field (() => Int)
        count!: number
}

@ObjectType()
class MediumCountYear {
    @Field(() => Int)
        count!: number

    @Field(() => Int)
        year!: number

    @Field(() => [MediumCountMonth])
        months!: MediumCountMonth[]
}

@ObjectType()
export class MediumCountDto {
    @Field(() => Int)
        count!: number

    @Field(() => [MediumCountYear])
        years!: MediumCountYear[]
}

@InputType()
@ArgsType()
export class MediumUpdateDto {
    @Field(() => String)
        id!: string

    @Field(() => String, {
        nullable: true
    })
        title?: Prisma.MediumUpdateInput['title']

    @Field(() => String, {
        nullable: true
    })
        description?: Prisma.MediumUpdateInput['description']

    @Field(() => String, {
        nullable: true
    })
        meta?: Prisma.MediumUpdateInput['meta']
}

@InputType()
@ArgsType()
export class MediumUpdateManyDto {
    @Field(() => [String])
        ids!: string[]

    @Field(() => String, {
        nullable: true
    })
        status?: Prisma.MediumUpdateInput['status']
}

@InputType()
@ArgsType()
export class MediumUploadDto {
    @Field(() => GraphQLUpload)
        filePromises!: Promise<FileUpload>[]
}

@InputType()
@ArgsType()
export class MediumFilterDto {
    @Field(() => String, {
        nullable: true
    })
        status?: string

    @Field(() => Boolean, {
        nullable: true
    })
        favorites?: boolean

    @Field(() => String, {
        nullable: true
    })
        q?: string

    @Field(() => String, {
        nullable: true
    })
        album?: string

    @Field(() => String, {
        nullable: true
    })
        sort?: string

    @Field(() => [String], {
        nullable: true
    })
        ids?: string[]
}
