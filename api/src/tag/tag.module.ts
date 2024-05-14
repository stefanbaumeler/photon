import { Module } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'
import { drizzleProvider } from '../drizzle/drizzle.provider'
import { TagService } from './tag.service'
import { TagRepository } from './tag.repository'

@Module({
    imports: [ClsModule],
    providers: [TagService, TagRepository, ...drizzleProvider],
    exports: [TagRepository]
})
export class UploadModule { }
