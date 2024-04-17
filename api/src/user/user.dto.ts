import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql'
import { User } from './user.model'
import { IsEmail } from 'class-validator'

@InputType()
@ArgsType()
export class UserLanguageDto {
    @Field(() => String)
        language!: string
}

@InputType()
@ArgsType()
export class UserSignInDto {
    @IsEmail()
    @Field(() => String)
        mail!: string

    @Field(() => String)
        password!: string
}

@InputType()
@ArgsType()
export class UserSignUpDto {
    @IsEmail()
    @Field(() => String)
        mail!: string

    @Field(() => String)
        password!: string

    @Field(() => String)
        firstName!: string

    @Field(() => String)
        lastName!: string

    @Field(() => String)
        language!: string
}

@ObjectType()
export class UserTokenDto {
    @Field(() => String)
        accessToken!: string

    @Field(() => String)
        refreshToken!: string

    @Field(() => User)
        user!: User
}

@InputType()
@ArgsType()
export class UserRefreshTokenDto {
    @Field(() => String)
        accessToken!: string

    @Field(() => String)
        refreshToken!: string
}

@InputType()
@ArgsType()
export class UserChangePasswordDto {
    @Field(() => String)
        mail!: string

    @Field(() => String)
        currentPassword!: string

    @Field(() => String)
        newPassword!: string
}

@InputType()
@ArgsType()
export class UserVerifyAccountDto {
    @Field(() => String)
        id!: string

    @Field(() => String)
        token!: string
}
