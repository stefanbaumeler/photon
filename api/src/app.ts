import express  from 'express'
import mediaRouter from './controllers/media'
import albumsRouter from './controllers/albums'
import uploadsRouter from './controllers/uploads'
import { graphqlUploadExpress } from 'graphql-upload'
import cookieParser from 'cookie-parser'

export const createApp = async () => {
    const app = express()

    app.disable('x-powered-by')

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
        next()
    })

    app.use(cookieParser())
    app.use(express.json())
    app.use(graphqlUploadExpress())
    app.use('/uploads', uploadsRouter)
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
