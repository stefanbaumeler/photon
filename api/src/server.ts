import { createApp } from './app'
import * as http from 'http'

export const createServer = async (): Promise<http.Server> => {
    return http.createServer(await createApp())
}

const port = 3000
const host = 'localhost'

export const startServer = async () => {
    const server = await createServer()

    server.listen(port, host, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
    })

    return true
}
