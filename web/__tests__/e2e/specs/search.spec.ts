import { globalBeforeEach } from '@/__tests__/e2e/support/common'
import { test } from '@playwright/test'
import { User } from '@/__tests__/e2e/actors/user'

globalBeforeEach()

test('can search', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    await overview.search.search('sea')
    await overview.shouldHaveTeasers(2)
    await overview.search.search('beach')
    await overview.shouldHaveTeasers(1)
})
