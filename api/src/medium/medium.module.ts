import { Module } from '@nestjs/common'
import { MediumController } from './medium.controller'
import { MediumResolver } from './medium.resolver'
import { MediumRepository } from './medium.repository'
import { MediumService } from './medium.service'
import { UploadService } from '../upload/upload.service'
import { ClsModule } from 'nestjs-cls'
import { drizzleProvider } from '../drizzle/drizzle.provider'
import { TagRepository } from '../tag/tag.repository'

@Module({
    imports: [ClsModule],
    controllers: [MediumController],
    providers: [MediumRepository, MediumResolver, MediumService, TagRepository, UploadService, ...drizzleProvider]
})
export class MediumModule { }
