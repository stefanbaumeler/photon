import { Controller, Get, Param } from '@nestjs/common'
import { Public } from '../auth/public.decorator'
import { Request, Response } from '@nestjs/common'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { ClsService } from 'nestjs-cls'
import { DownloadsService } from './downloads.service'

@Controller('downloads')
export class DownloadsController {
    constructor (private readonly service: DownloadsService, private cls: ClsService) {}
    @Public()
    @Get(':id')
    async uploads (@Param('id') id: string, @Response() res: ExpressResponse, @Request() req: ExpressRequest) {
        return await this.service.serve({
            id
        }, req, res)
    }
}
