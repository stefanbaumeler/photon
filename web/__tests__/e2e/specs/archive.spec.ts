import { globalBeforeEach } from '../support/common'
import { User } from '../actors/user'
import { test } from '@playwright/test'

globalBeforeEach()

test('can archive and unarchive', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    await overview.selectTeaser(0)
    const archive = await overview.selection.archive()

    await archive.shouldHaveTeasers(1)

    await archive.selectTeaser(0)

    await overview.selection.unarchive()
    await archive.shouldHaveTeasers(0)
})

test('can archive and unarchive by dragging', async ({ page }) => {

})
