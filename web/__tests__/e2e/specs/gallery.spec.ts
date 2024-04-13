import { test } from '@playwright/test'
import { globalBeforeEach } from '../support/common'
import { User } from '../actors/user'
import { predefinedMediumUUIDs } from '@photon/api/dist/src/database/helpers/ids'

globalBeforeEach()

test.describe.configure({
    mode: 'parallel'
})

test('can shift select', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()
    await overview.selectTeaser(0)

    await page.keyboard.down('Shift')
    await overview.getTeaser(2).click()
    await page.keyboard.up('Shift')

    await overview.getTeaser(0).shouldBeSelected()
    await overview.getTeaser(1).shouldBeSelected()
    await overview.getTeaser(2).shouldBeSelected()

    await page.keyboard.press('Escape')

    await overview.getTeaser(0).shouldNotBeSelected()
    await overview.getTeaser(1).shouldNotBeSelected()
    await overview.getTeaser(2).shouldNotBeSelected()
})

test('can select section', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()
    await overview.selectSection(0)
})

test('can select on details page', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    const teaser = await overview.selectTeaser(0)
    const details = await teaser.openSelected()

    await details.select()
    await page.keyboard.press('Escape')

    await details.shouldBeHidden()

    const unselectedTeaser = overview.getTeaser(0)

    await unselectedTeaser.shouldNotBeSelected()
})

test('can sort', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    const src = await overview.getTeaser(0).getSrc()

    await overview.actions.sortBy('oldest')
    await overview.getTeaser(-1).shouldHaveSrc(src)
    await overview.actions.sortBy('newest')
    await overview.getTeaser(0).shouldHaveSrc(src)
})

test('can rotate', async ({ page }) => {
    const user = new User(page)
    const details = user.detailView(predefinedMediumUUIDs[0])

    await details.visit()

    const image = await details.getMedium()

    const width = await image.getAttribute('naturalWidth')
    const height = await image.getAttribute('naturalHeight')

    await details.rotate()
    await details.shouldHaveRotated(width, height)
})
