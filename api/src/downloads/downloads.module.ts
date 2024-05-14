import { Module } from '@nestjs/common'
import { MediumRepository } from '../medium/medium.repository'
import { DownloadsController } from './downloads.controller'
import { ClsModule } from 'nestjs-cls'
import { DownloadsService } from './downloads.service'
import { drizzleProvider } from '../drizzle/drizzle.provider'
import { TagRepository } from '../tag/tag.repository'

@Module({
    imports: [ClsModule],
    controllers: [DownloadsController],
    providers: [MediumRepository, DownloadsService, TagRepository, ...drizzleProvider]
})
export class DownloadsModule { }
