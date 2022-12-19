import express  from 'express'
import mediaRouter from './controllers/media'
import albumsRouter from './controllers/albums'
import uploadsRouter from './controllers/uploads'
import { graphqlUploadExpress } from 'graphql-upload'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const createApp = async () => {
    const app = express()

    app.use(cookieParser())

    app.disable('x-powered-by')

    app.use(cors({
        origin: ['tauri://localhost', 'https://127.0.0.1:8001', 'http://127.0.0.1:1430',  'http://0.0.0.0:3030', 'http://localhost:3030', 'http://127.0.0.1:1430', 'https://studio.apollographql.com'],
        credentials: true
    }))
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
