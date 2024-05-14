import { Module } from '@nestjs/common'
import { FavoriteController } from './favorite.controller'
import { FavoriteRepository } from './favorite.repository'
import { FavoriteResolver } from './favorite.resolver'
import { FavoriteService } from './favorite.service'
import { ClsModule } from 'nestjs-cls'
import { drizzleProvider } from '../drizzle/drizzle.provider'
import { MediumRepository } from '../medium/medium.repository'
import { TagRepository } from '../tag/tag.repository'

@Module({
    imports: [ClsModule],
    controllers: [FavoriteController],
    providers: [FavoriteRepository, FavoriteResolver, FavoriteService, MediumRepository, TagRepository, ...drizzleProvider]
})
export class FavoriteModule { }
