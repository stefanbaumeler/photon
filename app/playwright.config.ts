import type { PlaywrightTestConfig } from '@playwright/test'
import { getEnv } from '@/env'

const env = getEnv()
const config: PlaywrightTestConfig =
    {
        testDir: './__tests__/e2e',
        globalSetup: './__tests__/e2e/support/setup',
        use: {
            baseURL: env.NEXT_PUBLIC_URL
        },
        workers: 1
    }
export default config
