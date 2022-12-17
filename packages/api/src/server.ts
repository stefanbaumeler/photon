import { createApp } from './app'
import * as http from 'http'
import { createApolloServer } from './apollo'

export const createServer = async (): Promise<http.Server> => {
    const app = await createApp()
    const apollo = await createApolloServer(app)

    return http.createServer(app)
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
