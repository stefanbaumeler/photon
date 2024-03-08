import { Query, Resolver } from '@nestjs/graphql'
import { DeviceService } from './device.service'
import { Device } from './device.model'

@Resolver(() => Device)
export class DeviceResolver {
    constructor (private readonly service: DeviceService) {}

    @Query(() => [Device])
    async devices () {
        return await this.service.own()
    }
}
