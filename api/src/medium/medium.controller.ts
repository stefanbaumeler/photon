import { Controller, Get, Param } from '@nestjs/common'
import { MediumService } from './medium.service'
import { ClsService } from 'nestjs-cls'

@Controller('media')
export class MediumController {
    constructor (private readonly service: MediumService, private cls: ClsService) {}
    @Get()
    media () {
        return this.service.getAll()
    }

    @Get('archive')
    archive () {
        return this.service.getArchive()
    }

    @Get('trash')
    trash () {
        return this.service.getTrash()
    }

    @Get('download/:id')
    download (@Param('id') id: string) {
        return this.service.download({
            ids: [id]
        })
    }

    @Get(':id')
    medium (@Param('id') id: string) {
        return this.service.getById({
            id
        })
    }
}
