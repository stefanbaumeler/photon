import express from 'express'
import MediaService from '../services/media'
import multer from 'multer'
import path from 'path'
import sizeOf from 'image-size'
import sharp from 'sharp'
import ExifReader from 'exifreader'

const upload = multer({
    dest: 'uploads/'
})

const router = express.Router()

router.get('/', async (req, res, next) => {
    const service = new MediaService()

    const result = await service.readMany()

    res.json({
        data: result || null
    })

    return next()
})

router.get('/:id', async (req, res, next) => {
    const service = new MediaService()

    const result = await service.readOne(req.params.id)

    res.json({
        data: result || null
    })

    return next()
})

router.post('/', upload.array('upload'), async (req, res, next) => {
    const service = new MediaService()

    if (req.files) {
        const data = req.files as Express.Multer.File[]

        await service.createMany(data.map((file) => {
            const dimensions = sizeOf(file.path)

            const getMetadata = async () => {
                ExifReader.load(file.path).then((meta) => {
                    console.log(meta)
                })
                const metadata = await sharp(file.path).metadata().then((meta) => {
                })
            }

            getMetadata()

            return {
                filename_disk: file.filename,
                filename_download: file.originalname,
                title: path.parse(file.originalname).name,
                description: '',
                height: dimensions.height || 0,
                width: dimensions.width || 0
            }
        }))

        res.json('ok').status(200)
    }

    return next()
})

export default router
