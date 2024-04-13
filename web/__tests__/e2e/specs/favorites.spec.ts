import { test, expect } from '@playwright/test'
import { globalBeforeEach, openDetails } from '../support/common'
import { User } from '../actors/user'

globalBeforeEach()

test('can favorite and unfavorite', async ({ page }) => {
    const user = new User(page)
    const favorites = user.favoritesView()

    await favorites.visit()

    const count = await favorites.getTeaserCount()
    const overview = await favorites.nav.visitOverview()
    const teaserToFavorite = await overview.selectTeaser(3)

    await overview.selection.favorite()
    await teaserToFavorite.shouldBeFavorite()
    await overview.nav.visitFavorites()
    await favorites.shouldHaveTeasers(count + 1)
    await favorites.nav.visitOverview()

    const teaserToUnfavorite = await overview.selectTeaser(3)

    await overview.selection.unfavorite()
    await teaserToUnfavorite.shouldNotBeFavorite()
    await overview.nav.visitFavorites()
    await favorites.shouldHaveTeasers(count)
})

test('can unfavorite on favorites details page', async ({ page }) => {
    const user = new User(page)
    const favorites = user.favoritesView()

    await favorites.visit()

    const count = await favorites.getTeaserCount()

    const teaser = favorites.getTeaser(0)
    const details = await teaser.click()

    await details.unfavorite()

    await page.keyboard.press('Escape')

    await favorites.shouldHaveTeasers(count - 1)
})
