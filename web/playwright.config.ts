import { defineConfig } from '@playwright/test'
import { getEnv } from 'web/env'

const env = getEnv()
export default defineConfig({
    testDir: './__tests__/e2e',
    globalSetup: './__tests__/e2e/support/setup',
    use: {
        baseURL: env.NEXT_PUBLIC_URL,
        video: 'retain-on-failure'
    },
    workers: 1
})
