import { Controller, Get, Param } from '@nestjs/common'
import { AlbumService } from './album.service'

@Controller('albums')
export class AlbumController {
    constructor (private readonly service: AlbumService) {}
    @Get()
    albums () {
        return this.service.getAll()
    }

    @Get(':id')
    album (@Param('id') id: string) {
        return this.service.getById({
            id
        })
    }

    @Get(':id/media')
    async media (@Param('id') id: string) {
        const album = await this.service.getById({
            id
        })

        return album?.media
    }
}
