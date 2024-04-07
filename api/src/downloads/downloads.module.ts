import { Module } from '@nestjs/common'
import { MediumRepository } from '../medium/medium.repository'
import { PrismaModule } from '../prisma/prisma.module'
import { DownloadsController } from './downloads.controller'
import { ClsModule } from 'nestjs-cls'
import { DownloadsService } from './downloads.service'

@Module({
    imports: [PrismaModule, ClsModule],
    controllers: [DownloadsController],
    providers: [MediumRepository, DownloadsService]
})
export class DownloadsModule {}
