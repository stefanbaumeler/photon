import express from 'express'
import AlbumsService from '../services/albums'

const router = express.Router()

router.get('/', async (req, res, next) => {
    const service = new AlbumsService()

    const result = await service.readMany()

    res.json({
        data: result || null
    })

    return next()
})

router.get('/:id', async (req, res, next) => {
    const service = new AlbumsService()

    const result = await service.readOne(req.params.id)

    res.json({
        data: result || null
    })

    return next()
})

router.post('/', async (req, res) => {
    const service = new AlbumsService()

    service.createOne({
        title: '',
        description: ''
    })
})

export default router
