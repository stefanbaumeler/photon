import { createApp } from './app'
import * as https from 'https'
import * as http from 'http'
import fs from 'fs'
import path from 'path'
import { getEnv } from '../env'

const env = getEnv()
export const createServer = async () => {
    const app = await createApp()

    if (parseInt(env.API_SECURE || '1', 10)) {
        return https.createServer({
            key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem')),
            cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem'))
        }, app)
    }

    return http.createServer(app)
}

export const startServer = async () => {
    const port = parseInt(env.API_PORT || '11011', 10)
    const protocol = parseInt(env.API_SECURE || '1', 10) ? 'https' : 'http'
    const host = env.API_HOST

    const server = await createServer()

    try {
        server.listen(port, '0.0.0.0', () => {
            console.log(`⚡️[server]: Server is running at ${protocol}://0.0.0.0:${port}`)
        })
    }
    catch (e) {
        console.log(e)
    }

    server.timeout = 500000

    return true
}
