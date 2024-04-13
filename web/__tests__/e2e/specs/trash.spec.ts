import { test } from '@playwright/test'
import { globalBeforeEach } from '../support/common'
import { User } from '../actors/user'

globalBeforeEach()

test.beforeEach(async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    await overview.selectTeaser(0)
    await overview.selectTeaser(1)
    await overview.selectTeaser(2)

    await overview.selection.moveToTrash()
    const trash = await overview.nav.visitTrash()

    await trash.shouldHaveTeasers(3)
})

test('can restore items', async ({ page }) => {
    const user = new User(page)
    const trash = user.trashView()

    await trash.selectTeaser(0)
    await trash.restoreSelected()
    await trash.shouldHaveTeasers(2)

    const overview = await trash.nav.visitOverview()
    await overview.shouldHaveTeasers(5)
})

test('can delete selected', async ({ page }) => {
    const user = new User(page)
    const trash = user.trashView()

    await trash.selectTeaser(0)
    await trash.deleteSelected()
    await trash.shouldHaveTeasers(2)
})

test('can empty trash', async ({ page }) => {
    const user = new User(page)
    const trash = user.trashView()

    await trash.empty()
    await trash.shouldHaveTeasers(0)
})
