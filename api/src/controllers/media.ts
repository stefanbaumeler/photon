import express from 'express'
import MediaService from '../services/media'

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

export default router
