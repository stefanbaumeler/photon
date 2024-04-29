import { Module } from '@nestjs/common'
import { AlbumController } from './album.controller'
import { AlbumResolver } from './album.resolver'
import { AlbumRepository } from './album.repository'
import { AlbumService } from './album.service'
import { PrismaModule } from '../prisma/prisma.module'
import { ClsModule } from 'nestjs-cls'
import { drizzleProvider } from '../drizzle/drizzle.provider'

@Module({
    imports: [PrismaModule, ClsModule],
    controllers: [AlbumController],
    providers: [AlbumRepository, AlbumResolver, AlbumService, ...drizzleProvider]
})
export class AlbumModule {}
