import { test } from '@playwright/test'
import { globalBeforeEach } from '../support/common'
import { User } from '../actors/user'

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

const views = ['gallery', 'list']

for (const i in views) {
    test(`can select on ${views[i]}`, async ({ page }) => {
        const user = new User(page)
        const overview = user.overviewView()

        await overview.visit()
        await overview.actions.setView(views[i])

        await overview.selectTeaser(0)
        await overview.selectTeaser(1)
        await overview.selectTeaser(2)
    })

    test(`can delete on ${views[i]}`, async ({ page }) => {
        const user = new User(page)
        const overview = user.overviewView()

        await overview.visit()
        await overview.actions.setView(views[i])

        const count = await overview.getTeaserCount()
        const dialog = await overview.getTeaser(0).moveToTrash()

        await dialog.confirm()
        await overview.shouldHaveTeasers(count - 1)

        const trash = await overview.nav.visitTrash()

        await trash.shouldHaveTeasers(1)
    })

    test(`can sort on ${views[i]}`, async ({ page }) => {
        const user = new User(page)
        const overview = user.overviewView()

        await overview.visit()

        await overview.actions.setView(views[i])

        const src = await overview.getTeaser(0).getSrc()

        await overview.actions.sortBy('oldest')
        await overview.getTeaser(-1).shouldHaveSrc(src)
        await overview.actions.sortBy('newest')
        await overview.getTeaser(0).shouldHaveSrc(src)
    })

    test(`can rotate on ${views[i]}`, async ({ page }) => {
        const user = new User(page)
        const overview = user.overviewView()

        await overview.visit()
        await overview.actions.setView(views[i])

        const teaser = await overview.getTeaser(0)

        const image = await teaser.getMedium()

        const before = await image.evaluate((img) => {
            return {
                width: img.naturalWidth,
                height: img.naturalHeight
            }
        })

        await teaser.rotate()
        await teaser.shouldHaveRotated(before.width, before.height)
    })

    test(`can archive on ${views[i]}`, async ({ page }) => {
        const user = new User(page)
        const overview = user.overviewView()

        await overview.visit()
        await overview.actions.setView(views[i])

        const count = await overview.getTeaserCount()

        const archive = await overview.getTeaser(0).archive()

        await archive.shouldHaveTeasers(1)

        await archive.nav.visitOverview()
        await overview.shouldHaveTeasers(count - 1)
        await overview.nav.visitArchive()

        await archive.getTeaser(0).unarchive()
        await archive.shouldHaveTeasers(0)

        await archive.nav.visitOverview()
        await overview.shouldHaveTeasers(count)
    })

    test(`can favorite on ${views[i]}`, async ({ page }) => {
        const user = new User(page)
        const favorites = user.favoritesView()

        await favorites.visit()

        const count = await favorites.getTeaserCount()
        const overview = await favorites.nav.visitOverview()

        await overview.actions.setView(views[i])

        await overview.getTeaser(3).favorite(views[i])

        await overview.nav.visitFavorites()
        await favorites.shouldHaveTeasers(count + 1)

        await overview.nav.visitOverview()
        await overview.getTeaser(3).unfavorite(views[i])

        await overview.nav.visitFavorites()
        await favorites.shouldHaveTeasers(count)
    })

    test(`can download on ${views[i]}`, async ({ page }) => {
        const user = new User(page)
        const overview = user.overviewView()

        await overview.visit()
        await overview.actions.setView(views[i])
        await overview.getTeaser(0).download(views[i])
    })
}
