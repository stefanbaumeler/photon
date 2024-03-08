import { Controller, Get } from '@nestjs/common'
import { DeviceService } from './device.service'

@Controller('media')
export class DeviceController {
    constructor (private readonly service: DeviceService) {}
    @Get()
    async devices () {
        return this.service.own()
    }
}
