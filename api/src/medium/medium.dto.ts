import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal'
import { TMeta } from '@photon/schema/server'
import { Meta } from '../meta/meta.model'

@InputType()
@ArgsType()
export class MediumFilenameDiskDto {
    @Field(() => String)
        filenameDisk!: string
}

@InputType()
@ArgsType()
export class MediumIdOrHashDto {
    @Field(() => String, {
        nullable: true
    })
        id?: string

    @Field(() => String, {
        nullable: true
    })
        hash?: string
}

@InputType()
@ArgsType()
export class MediumStatusDto {
    @Field(() => String)
        status!: string
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

    @Field(() => Int)
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
        title?: string

    @Field(() => String, {
        nullable: true
    })
        description?: string

    @Field(() => String, {
        nullable: true
    })
        meta?: TMeta
}

@InputType()
@ArgsType()
export class MediumUpdateManyDto {
    @Field(() => [String])
        ids!: string[]

    @Field(() => String, {
        nullable: true
    })
        status?: string
}

@InputType()
@ArgsType()
export class MediumUploadDto {
    @Field(() => [GraphQLUpload])
        filePromises!: FileUpload[]
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

@InputType()
@ArgsType()
export class MediumRotateDto {
    @Field(() => String)
        id!: string

    @Field(() => Int)
        deg!: number
}

@ArgsType()
export class MediumCreateDto {
    @Field(() => String, {
        nullable: true
    })
        hash?: string | null

    @Field(() => String, {
        nullable: true
    })
        dateTaken?: string | null

    @Field(() => String, {
        nullable: true
    })
        filenameDisk: string

    @Field(() => String, {
        nullable: true
    })
        filenameDownload?: string | null

    @Field(() => String, {
        nullable: true
    })
        title?: string | null

    @Field(() => String, {
        nullable: true
    })
        description?: string | null

    @Field(() => [Number, Number], {
        nullable: true
    })
        location?: [number, number]

    @Field(() => String, {
        nullable: true
    })
        status?: string | null

    @Field(() => String, {
        nullable: true
    })
        mimetype?: string | null

    @Field(() => Meta, {
        nullable: true
    })
        meta?: TMeta

    @Field(() => String, {
        nullable: true
    })
        country?: string | null

    @Field(() => String, {
        nullable: true
    })
        region?: string | null

    @Field(() => String, {
        nullable: true
    })
        place?: string | null

    @Field(() => String, {
        nullable: true
    })
        address?: string | null
}
