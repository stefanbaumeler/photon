import express from 'express'
import sharp from 'sharp'
import * as fs from 'fs'
import MediaService from '../services/media'
import jwt from 'jsonwebtoken'
import { predefinedUserUUIDs } from '../database/helpers/ids'

const router = express.Router()

const resize = (p: string, width: string | undefined) => {
    const readStream = fs.createReadStream(p)
    const transform = sharp()

    if (width) {
        const resized = transform.resize(+width)
        return readStream.pipe(resized)
    }

    return readStream
}

router.get('/:id', async (req, res, next) => {
    res.setHeader('Content-Type', 'image/jpeg')

    try {
        let userInfo

        if (process.env.NODE_ENV === 'test') {
            userInfo = {
                id: predefinedUserUUIDs[0]
            }
        }
        else {
            jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET as string)
            userInfo = jwt.decode(req.cookies.accessToken) as { id: string }
        }

        const medium = await new MediaService().readOneFromDisk(req.params.id)

        console.log(medium, req.params.id)
        if (medium?.owner?.id !== userInfo.id) {
            res.statusCode = 403
            res.send()
            next()
            return
        }

        if (!req.query.download) {
            resize(`./uploads/${req.params.id}`, req.query.w as string).pipe(res)
        }
        else {
            await new MediaService().readOneFromDisk(req.params.id).then((medium) => {
                if (medium) {
                    res.setHeader(
                        'Content-disposition',
                        `attachment; filename=${medium.filenameDownload}`
                    )
                    resize(`./uploads/${req.params.id}`, req.query.w as string).pipe(res)
                }
            })
        }
    }
    catch {
        res.statusCode = 403
        res.send()
        next()
    }
})

export default router
