import { createApp } from './app'
import * as https from 'https'
import * as http from 'http'
import { createApolloServer } from './apollo'
import fs from 'fs'

export const createServer = async (): Promise<https.Server|http.Server> => {
    const app = await createApp()
    const apollo = await createApolloServer(app)

    if (parseInt(process.env.API_SECURE || '1', 10)) {
        return https.createServer({
            key: fs.readFileSync('../../ssl/key.pem'),
            cert: fs.readFileSync('../../ssl/cert.pem')
        }, app)
    }

    return http.createServer(app)
}

export const startServer = async () => {
    const port = parseInt(process.env.API_PORT || '110011', 10)
    const protocol = parseInt(process.env.API_SECURE || '1', 10) ? 'https' : 'http'
    const host = process.env.API_HOST

    const server = await createServer()

    server.listen(port, host, () => {
        console.log(`⚡️[server]: Server is running at ${protocol}://${host}:${port}`)
    })

    return true
}
