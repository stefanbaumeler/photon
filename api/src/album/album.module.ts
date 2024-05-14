import { Module } from '@nestjs/common'
import { AlbumController } from './album.controller'
import { AlbumResolver } from './album.resolver'
import { AlbumRepository } from './album.repository'
import { AlbumService } from './album.service'
import { ClsModule } from 'nestjs-cls'
import { drizzleProvider } from '../drizzle/drizzle.provider'

@Module({
    imports: [ClsModule],
    controllers: [AlbumController],
    providers: [AlbumRepository, AlbumResolver, AlbumService, ...drizzleProvider]
})
export class AlbumModule { }
