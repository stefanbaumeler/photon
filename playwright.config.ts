import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    globalSetup: './app/__tests__/e2e/support/setup',
    use: {
        baseURL: 'http://localhost:3030'
    },
    workers: 1
}

export default config
