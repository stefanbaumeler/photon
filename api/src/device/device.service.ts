import { Injectable } from '@nestjs/common'
import { DeviceRepository } from './device.repository'
import { ClsService } from 'nestjs-cls'
@Injectable()
export class DeviceService {
    constructor (private repository: DeviceRepository, private cls: ClsService) {}

    own () {
        return this.repository.findByUser({
            id: this.cls.get('userId')
        })
    }
}
