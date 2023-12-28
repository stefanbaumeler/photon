import { Controller, Get } from '@nestjs/common'
import { FavoriteService } from './favorite.service'

@Controller('albums')
export class FavoriteController {
    constructor (private readonly service: FavoriteService) {}
    @Get()
    favorites () {
        return this.service.own()
    }
}
