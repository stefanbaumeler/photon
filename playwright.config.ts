import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    globalSetup: './tests/playwright/support/setup',
    use: {
        baseURL: 'http://localhost:3030'
    },
    workers: 1
}

export default config
