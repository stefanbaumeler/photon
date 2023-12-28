import { Module } from '@nestjs/common'
import { MediumRepository } from '../medium/medium.repository'
import { PrismaModule } from '../prisma/prisma.module'
import { UploadController } from './upload.controller'
import { ClsModule } from 'nestjs-cls'
import { UploadService } from './upload.service'

@Module({
    imports: [PrismaModule, ClsModule],
    controllers: [UploadController],
    providers: [MediumRepository, UploadService]
})
export class UploadModule {}
