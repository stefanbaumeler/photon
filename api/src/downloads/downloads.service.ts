import { Injectable } from '@nestjs/common'
import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'
import { IdDto } from '../shared/dto'

@Injectable()
export class DownloadsService {
    constructor () {}

    async serve (dto: IdDto, req: Request, res: Response) {
        res.setHeader('Content-Type', 'application/zip')

        const downloadPath = path.join(__dirname, '../../../', `./downloads/${dto.id}`)

        try {
            fs.createReadStream(downloadPath).on('end', () => {
                fs.unlinkSync(downloadPath)
            }).pipe(res)
        }
        catch (e) {
            console.log(e)
            res.statusCode = 403
            res.send()
        }
    }
}
