import { Module } from '@nestjs/common'
import { DeviceController } from './device.controller'
import { DeviceResolver } from './device.resolver'
import { DeviceRepository } from './device.repository'
import { DeviceService } from './device.service'
import { PrismaModule } from '../prisma/prisma.module'
import { ClsModule } from 'nestjs-cls'

@Module({
    imports: [PrismaModule, ClsModule],
    controllers: [DeviceController],
    providers: [DeviceRepository, DeviceResolver, DeviceService]
})
export class DeviceModule {}
