import { Module } from '@nestjs/common'
import { DeviceController } from './device.controller'
import { DeviceResolver } from './device.resolver'
import { DeviceRepository } from './device.repository'
import { DeviceService } from './device.service'
import { ClsModule } from 'nestjs-cls'
import { drizzleProvider } from '../drizzle/drizzle.provider'

@Module({
    imports: [ClsModule],
    controllers: [DeviceController],
    providers: [DeviceRepository, DeviceResolver, DeviceService, ...drizzleProvider]
})
export class DeviceModule { }
