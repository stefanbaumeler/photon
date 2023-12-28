import { Module } from '@nestjs/common'
import { MediumController } from './medium.controller'
import { MediumResolver } from './medium.resolver'
import { MediumRepository } from './medium.repository'
import { MediumService } from './medium.service'
import { PrismaModule } from '../prisma/prisma.module'
import { UploadService } from '../upload/upload.service'
import { ClsModule } from 'nestjs-cls'

@Module({
    imports: [PrismaModule, ClsModule],
    controllers: [MediumController],
    providers: [MediumRepository, MediumResolver, MediumService, UploadService]
})
export class MediumModule {}
