import express  from 'express'
import mediaRouter from './controllers/media'
import albumsRouter from './controllers/albums'

export const createApp = async () => {
    const app = express()

    app.disable('x-powered-by')

    app.use(express.json())

    app.use('/media', mediaRouter)
    app.use('/albums', albumsRouter)

    app.get('/', (req, res, next) => {
        res.status(200).json({
            name: 'foo',
            foo: 'bar'
        })

        next()
    })

    return app
}
