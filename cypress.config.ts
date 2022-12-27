import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
})

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3030',
        video: false,
        setupNodeEvents (on, config) {
            config.env = {
                ...process.env,
                ...config.env
            }

            on('task', {
                log (message) {
                    console.log(message)
                    return null
                }
            })

            return config
        }
    },
    nodeVersion: 'system',
    fixturesFolder: './cypress/fixtures'
})
