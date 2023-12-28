import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
import { PrismaModule } from '../prisma/prisma.module'
import { AccessTokenStrategy } from '../auth/strategies/accessToken.strategy'
import { JwtService } from '@nestjs/jwt'
import { ClsModule } from 'nestjs-cls'

@Module({
    imports: [PrismaModule, ClsModule],
    controllers: [UserController],
    providers: [UserRepository, UserResolver, UserService, JwtService, AccessTokenStrategy]
})
export class UserModule {}
