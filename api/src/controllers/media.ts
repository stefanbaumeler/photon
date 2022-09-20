import express from 'express'
import MediaService from '../services/media'
import multer from 'multer'
import path from 'path'
import sizeOf from 'image-size'
import ExifReader from 'exifreader'
import { Medium } from '../types'

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

        const writePromises = data.map((file) => new Promise<Omit<Medium, 'id' | 'date_created' | 'date_modified'>>((resolve) => {
            const dimensions = sizeOf(file.path)

            ExifReader.load(file.path).then((meta) => {
                let fNumber = meta.FNumber?.value

                if (fNumber && Array.isArray(fNumber)) {
                    fNumber = fNumber.reduce((a, b) => a / b)
                }

                const date = meta.DateTime?.value[0].split(' ')[0].split(':').join('-')
                const time = meta.DateTime?.value[0].split(' ')[1]
                const dateTime = [date, time].join(' ')

                const latRef = meta.GPSLatitudeRef?.value[0] === 'N' ? 1 : -1
                const lngRef = meta.GPSLongitudeRef?.value[0] === 'E' ? 1 : -1

                const rawLat = parseFloat(meta.GPSLatitude?.description || '') * latRef
                const rawLng = parseFloat(meta.GPSLongitude?.description || '') * lngRef

                const lat = Number.isNaN(rawLat) ? null : rawLat
                const lng = Number.isNaN(rawLng) ? null : rawLng

                resolve({
                    date_taken: dateTime,
                    filename_disk: file.filename,
                    filename_download: file.originalname,
                    title: path.parse(file.originalname).name,
                    description: '',
                    height: dimensions.height || 0,
                    width: dimensions.width || 0,
                    camera_make: meta.Make?.value[0],
                    camera_model: meta.Model?.value[0],
                    flash: meta.Flash?.value,
                    f_number: fNumber,
                    lat,
                    lng
                })
            })
        }))

        Promise.all(writePromises).then((data) => {
            service.createMany(data)
        })

        res.json('ok').status(200)
    }

    return next()
})

export default router
