import express from 'express'
import MediaService from '../services/media'
import multer from 'multer'
import { Medium } from '../types'
import { exifToMedium } from '../helpers/exif'

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

router.delete('/:id', async (req, res, next) => {
    const service = new MediaService()

    const result = await service.destroy(req.params.id)

    res.status(200)

    return next()
})

router.post('/', upload.array('upload'), async (req, res, next) => {
    const service = new MediaService()

    if (req.files) {
        const data = req.files as Express.Multer.File[]

        const writePromises = data.map((file) => new Promise<Omit<Medium, 'id' | 'dateCreated' | 'dateModified'>>((resolve) => {
            exifToMedium(file.path, file.filename, file.originalname).then((medium) => {
                resolve(medium)
            })
        }))

        Promise.all(writePromises).then((data) => {
            service.createMany(data).then(() => {
                res.json('ok').status(200)
                return next()
            })
        })
    }
})

export default router
