import express  from 'express'
import mediaRouter from './controllers/media'
import albumsRouter from './controllers/albums'
import uploadsRouter from './controllers/uploads'
import { graphqlUploadExpress } from 'graphql-upload'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers, typeDefs } from './graphql'
import { authDirectiveTransformer } from './graphql/directives'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { context } from './context'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import https from 'https'
import fs from 'fs'
import http from 'http'

export const createApp = async () => {
    const app = express()

    const server = parseInt(process.env.API_SECURE || '1', 10) ? https.createServer({
        key: fs.readFileSync('../../ssl/key.pem'),
        cert: fs.readFileSync('../../ssl/cert.pem')
    }, app) : http.createServer(app)

    let schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    schema = authDirectiveTransformer(schema, 'auth')

    const apollo = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({
            httpServer: server
        })]
    })

    await apollo.start()

    app.use(
        cookieParser(),
        cors({
            methods: ['GET', 'POST', 'OPTIONS'],
            origin: ['tauri://localhost', 'https://127.0.0.1:8001', 'http://127.0.0.1:1430',  'http://0.0.0.0:3030', 'http://localhost:3030', 'http://localhost:3030/', 'http://127.0.0.1:1430', 'https://studio.apollographql.com'],
            credentials: true
        }),
        express.json(),
        graphqlUploadExpress()
    )

    app.disable('x-powered-by')

    app.use(
        '/graphql',
        cors({
            methods: ['GET', 'POST', 'OPTIONS'],
            origin: ['tauri://localhost', 'https://127.0.0.1:8001', 'http://127.0.0.1:1430',  'http://0.0.0.0:3030', 'http://localhost:3030', 'http://localhost:3030/', 'http://127.0.0.1:1430', 'https://studio.apollographql.com'],
            credentials: true
        }),
        expressMiddleware(apollo, {
            context
        })
    )

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
