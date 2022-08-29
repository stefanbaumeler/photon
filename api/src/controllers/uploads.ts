import express from 'express'
import sharp from 'sharp'
import * as fs from 'fs'

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
    resize(`./uploads/${req.params.id}`, req.query.w as string).pipe(res)
})

export default router
