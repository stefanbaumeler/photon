import { createApp } from './app'
import * as https from 'https'
import * as http from 'http'
import { createApolloServer } from './apollo'
import fs from 'fs'

export const createServer = async (): Promise<https.Server|http.Server> => {
    const app = await createApp()
    const apollo = await createApolloServer(app)

    if (process.env.NODE_ENV === 'development') {
        return http.createServer(app)
    }

    return https.createServer({
        key: fs.readFileSync('../../ssl/key.pem'),
        cert: fs.readFileSync('../../ssl/cert.pem')
    }, app)
}

const port = 2001
const host = '0.0.0.0'

export const startServer = async () => {
    const server = await createServer()

    server.listen(port, host, () => {
        console.log(`⚡️[server]: Server is running at https://0.0.0.0:${port}`)
    })

    return true
}
