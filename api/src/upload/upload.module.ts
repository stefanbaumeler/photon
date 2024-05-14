import { Module } from '@nestjs/common'
import { MediumRepository } from '../medium/medium.repository'
import { UploadController } from './upload.controller'
import { ClsModule } from 'nestjs-cls'
import { UploadService } from './upload.service'
import { drizzleProvider } from '../drizzle/drizzle.provider'
import { TagRepository } from '../tag/tag.repository'

@Module({
    imports: [ClsModule],
    controllers: [UploadController],
    providers: [MediumRepository, TagRepository, UploadService, ...drizzleProvider]
})
export class UploadModule { }
