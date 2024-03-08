import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './user.model'
import { UserLanguageDto, UserRefreshTokenDto, UserSignInDto, UserSignUpDto, UserTokenDto } from './user.dto'
import { Public } from '../auth/public.decorator'
import { Response } from 'express'

@Resolver(() => User)
export class UserResolver {
    constructor (private readonly service: UserService) {}

    @Query(() => User)
    async profile () {
        return this.service.profile()
    }

    @Public()
    @Mutation(() => UserTokenDto)
    async signIn (@Args() dto: UserSignInDto, @Context('res') res: Response) {
        return await this.service.signIn(dto, res)
    }

    @Mutation(() => Boolean)
    async signOut (@Context('res') res: Response) {
        return this.service.signOut(res)
    }

    @Public()
    @Mutation(() => UserTokenDto)
    async signUp (@Args() dto: UserSignUpDto, @Context('res') res: Response) {
        return await this.service.signUp(dto, res)
    }

    @Mutation(() => User)
    async changeLanguage (@Args() dto: UserLanguageDto) {
        return this.service.changeLanguage(dto)
    }

    @Public()
    @Mutation(() => UserTokenDto)
    async refreshAccessToken (@Args() dto: UserRefreshTokenDto, @Context('res') res: Response) {
        return this.service.refreshAccessToken(dto, res)
    }
}
