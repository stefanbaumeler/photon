import express from 'express'
import MediaService from '../services/media'
import multer from 'multer'
import path from 'path'

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

router.post('/', upload.single('upload'), async (req, res, next) => {
    const service = new MediaService()

    if (req.file) {
        const created = await service.createOne({
            filename_disk: req.file.filename,
            filename_download: req.file.originalname,
            title: path.parse(req.file.originalname).name,
            description: ''
        })

        res.json(created)
    }

    return next()
})

export default router
