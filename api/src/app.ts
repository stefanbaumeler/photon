import express from 'express'
import mediaRouter from './controllers/media'
import albumsRouter from './controllers/albums'
import uploadsRouter from './controllers/uploads'
import downloadsRouter from './controllers/downloads'
import { graphqlUploadExpress } from 'graphql-upload-minimal'
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
import path from 'path'
import { getEnv } from '../env'

const env = getEnv()

export const getApollo = (app: ReturnType<typeof express>) => {
    // const server = parseInt(process.env.API_SECURE || '1', 10) ? https.createServer({
    //     key: fs.readFileSync(path.join(__dirname, '../../ssl/key.pem')),
    //     cert: fs.readFileSync(path.join(__dirname, '../../ssl/cert.pem'))
    // }, app) : http.createServer(app)

    const server = http.createServer(app)

    let schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    schema = authDirectiveTransformer(schema, 'auth')

    return new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({
            httpServer: server
        })]
    })
}

export const createApp = async () => {
    const app = express()

    const apollo = getApollo(app)
    await apollo.start()

    const origins = [
        'tauri://localhost',
        'localhost',
        'localhost:3030',
        'http://localhost',
        'http://localhost/',
        'http://localhost:3030',
        'http://localhost:3030/',
        'http://localhost:11011',
        '127.0.0.1',
        '127.0.0.1:3030',
        'http://127.0.0.1',
        'http://127.0.0.1/',
        'http://127.0.0.1:3030',
        'http://127.0.0.1:3030/',
        'http://127.0.0.1:1430',
        'http://0.0.0.0:3030',
        '0.0.0.0',
        '0.0.0.0:3030',
        'http://0.0.0.0',
        'http://0.0.0.0/',
        'http://0.0.0.0:3030',
        'http://0.0.0.0:3030/',
        '10.5.0.5',
        '10.5.0.5:3030',
        'http://10.5.0.5',
        'http://10.5.0.5:3030',
        'http://10.5.0.5:3030/',
        '10.5.0.6',
        '10.5.0.6:3030',
        'http://10.5.0.6',
        'http://10.5.0.6:3030',
        'http://10.5.0.6:3030/',
        '10.5.0.2',
        '10.5.0.2:3030',
        'http://10.5.0.2',
        'http://10.5.0.2/',
        'http://10.5.0.2:3030',
        'http://10.5.0.2:3030/',
        'https://studio.apollographql.com'
    ]

    app.use(
        cookieParser(),
        cors({
            methods: ['GET', 'POST', 'OPTIONS'],
            origin: origins,
            credentials: !!parseInt(env.API_CREDENTIALS || '1', 10)
        }),
        express.json(),
        graphqlUploadExpress()
    )

    app.disable('x-powered-by')

    app.use(
        '/graphql',
        cors({
            methods: ['GET', 'POST', 'OPTIONS'],
            origin: origins,
            credentials: !!parseInt(env.API_CREDENTIALS || '1', 10)
        }),
        expressMiddleware(apollo, {
            context
        })
    )

    app.use('/uploads', uploadsRouter)
    app.use('/downloads', downloadsRouter)
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
