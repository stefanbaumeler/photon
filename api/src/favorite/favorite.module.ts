import { Module } from '@nestjs/common'
import { FavoriteController } from './favorite.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { FavoriteRepository } from './favorite.repository'
import { FavoriteResolver } from './favorite.resolver'
import { FavoriteService } from './favorite.service'
import { ClsModule } from 'nestjs-cls'

@Module({
    imports: [PrismaModule, ClsModule],
    controllers: [FavoriteController],
    providers: [FavoriteRepository, FavoriteResolver, FavoriteService]
})
export class FavoriteModule {}
