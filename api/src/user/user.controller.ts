import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor (private readonly service: UserService) {}

    @Get(':id')
    one (@Param('id') id: string) {
        return id
    }

    @Get(':id/verify/:token')
    verify (@Param('id') id: string, @Param('token') token: string) {
        return this.service.verifyAccount({
            id,
            token
        })
    }
}
