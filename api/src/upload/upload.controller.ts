import { Controller,
    Get,
    Param,
    Post,
    Request,
    Response,
    UploadedFiles,
    UseInterceptors } from '@nestjs/common'
import { Public } from '../auth/public.decorator'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { UploadService } from './upload.service'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { randomUUID } from 'crypto'
import { getEnv } from '../../env'

const env = getEnv()

const storage = diskStorage({
    destination: env.API_UPLOADS_DIR,
    filename: (req, file, cb) => {
        cb(null, randomUUID())
    }
})

@Controller('uploads')
export class UploadController {
    constructor (private readonly service: UploadService) {}
    @Public()
    @Post('uploads')
    @UseInterceptors(AnyFilesInterceptor({
        storage
    }))
    async upload (@UploadedFiles() uploads: Express.Multer.File[]) {
        const media = await this.service.handleUploads(uploads)
        return this.service.createMany(media)
    }

    @Public()
    @Get(':id')
    async uploads (@Param('id') id: string, @Response() res: ExpressResponse, @Request() req: ExpressRequest) {
        return await this.service.serve({
            id
        }, req, res)
    }
}
