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

        const hash = (str: string, seed = 0) => {
            // https://stackoverflow.com/a/52171480

            let h1 = 0xdeadbeef ^ seed,
                h2 = 0x41c6ce57 ^ seed
            for (let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i)
                h1 = Math.imul(h1 ^ ch, 2654435761)
                h2 = Math.imul(h2 ^ ch, 1597334677)
            }

            h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909)
            h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909)

            return 4294967296 * (2097151 & h2) + (h1 >>> 0)
        }

        const writePromises = data.map((file) => new Promise<Omit<Medium, 'id' | 'dateCreated' | 'dateModified'>>((resolve) => {
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
                    hash: hash(JSON.stringify(meta)),
                    dateTaken: dateTime,
                    filenameDisk: file.filename,
                    filenameDownload: file.originalname,
                    title: path.parse(file.originalname).name,
                    description: '',
                    height: dimensions.height || 0,
                    width: dimensions.width || 0,
                    cameraMake: meta.Make?.value[0],
                    cameraModel: meta.Model?.value[0],
                    flash: meta.Flash?.value,
                    fNumber: fNumber,
                    lat,
                    lng
                })
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
