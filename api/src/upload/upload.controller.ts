import { Controller, Get, Param } from '@nestjs/common'
import { Public } from '../auth/public.decorator'
import { Request, Response } from '@nestjs/common'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { ClsService } from 'nestjs-cls'
import { UploadService } from './upload.service'

@Controller('uploads')
export class UploadController {
    constructor (private readonly service: UploadService, private cls: ClsService) {}
    @Public()
    @Get(':id')
    async uploads (@Param('id') id: string, @Response() res: ExpressResponse, @Request() req: ExpressRequest) {
        return await this.service.serve({
            id
        }, req, res)
    }
}
