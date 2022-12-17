import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://0.0.0.0:3030',
        video: false,
        setupNodeEvents (on, config) {
            on('task', {
                log (message) {
                    console.log(message)
                    return null
                }
            })
        }
    },
    fixturesFolder: './cypress/fixtures'
})
