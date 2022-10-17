import express from 'express'
import sharp from 'sharp'
import * as fs from 'fs'
import MediaService from '../services/media'

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

router.get('/:id', async (req, res) => {
    res.setHeader('Content-Type', 'image/png')

    if (req.query.download) {
        await new MediaService().readOneFromDisk(req.params.id).then((medium) => {
            res.setHeader(
                'Content-disposition',
                `attachment; filename=${medium[0].filenameDownload}`
            )
            resize(`./uploads/${req.params.id}`, req.query.w as string).pipe(res)
        })
    }
    else {
        resize(`./uploads/${req.params.id}`, req.query.w as string).pipe(res)
    }
})

export default router
