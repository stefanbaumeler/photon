import { defineConfig } from 'cypress'
import { getEnv } from './src/api/env'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3030',
        video: false,
        setupNodeEvents (on, config) {
            config.env = {
                ...getEnv(),
                ...config.env
            }

            on('task', {
                log (message) {
                    console.log(message)
                    return null
                }
            })

            return config
        },
        fixturesFolder: './tests/fixtures',
        supportFile: './tests/cypress/support/e2e.ts',
        specPattern: './tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
    },
    nodeVersion: 'system'
})
