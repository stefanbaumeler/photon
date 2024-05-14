import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
import { AccessTokenStrategy } from '../auth/strategies/accessToken.strategy'
import { JwtService } from '@nestjs/jwt'
import { ClsModule } from 'nestjs-cls'
import { MailModule } from '../mail/mail.module'
import { TagRepository } from '../tag/tag.repository'
import { drizzleProvider } from '../drizzle/drizzle.provider'

@Module({
    imports: [ClsModule, MailModule],
    controllers: [UserController],
    providers: [UserRepository, TagRepository, UserResolver, UserService, JwtService, AccessTokenStrategy, ...drizzleProvider]
})
export class UserModule { }
