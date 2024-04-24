import { test } from '@playwright/test'
import { globalBeforeEach } from '../support/common'
import { User } from '../actors/user'
import { predefinedAlbumUUIDs, predefinedMediumUUIDs } from '@photon/api/dist/src/database/helpers/ids'

globalBeforeEach()

test.describe.configure({
    mode: 'parallel'
})

test('can navigate using keyboard', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    const ids = await overview.getDetailIds()

    const details = await overview.getTeaser(0).click()

    await details.shouldBeVisible()
    await details.shouldBeMedium(ids[0])
    await page.keyboard.press('ArrowRight')
    await details.shouldBeMedium(ids[1])
    await page.keyboard.press('ArrowLeft')
    await details.shouldBeMedium(ids[0])
    await page.keyboard.press('Escape')
    await details.shouldBeHidden()
})

test('can navigate using buttons', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    const ids = await overview.getDetailIds()
    const details = await overview.getTeaser(0).click()

    await details.next()
    await details.shouldBeMedium(ids[1])
    await details.prev()
    await details.shouldBeMedium(ids[0])
})

test('can open on album page', async ({ page }) => {
    const user = new User(page)
    const album = user.albumView(predefinedAlbumUUIDs[0])

    await album.visit()

    const details = await album.getTeaser(0).click()

    await details.shouldBeMedium(predefinedMediumUUIDs[0])
})

test('can open and close infos', async ({ page }) => {
    const user = new User(page)
    const details = user.detailView(predefinedMediumUUIDs[0])

    await details.visit()

    await details.hideInfos()
    await details.showInfos()
})

test('can show details correctly', async ({ page }) => {
    const user = new User(page)
    const details = user.detailView(predefinedMediumUUIDs[0])

    await details.visit()

    await details.shouldShowAlbum('Test Album')
    await details.shouldShowCameraDetail('Google Pixel 6')
    await details.shouldShowCameraDetail('f/1.85')
    await details.shouldShowCameraDetail('ISO40')
    await details.shouldShowImageDetail('Test Image 0')
    await details.shouldShowImageDetail('12.5MP')
    await details.shouldShowImageDetail('4080×3072')
    await details.shouldBeOwnedBy('Test McTestFace')
    await details.shouldBeSharedWith('Test McTestFace')
})

test('can select', async ({ page }) => {
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

test('can delete', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    const count = await overview.getTeaserCount()
    const dialog = await overview.getTeaser(0).moveToTrash()

    await dialog.confirm()
    await overview.shouldHaveTeasers(count - 1)

    const trash = await overview.nav.visitTrash()

    await trash.shouldHaveTeasers(1)
})

test('can rotate', async ({ page }) => {
    const user = new User(page)
    const details = user.detailView(predefinedMediumUUIDs[0])

    await details.visit()

    const image = await details.getMedium()

    const before = await image.evaluate((img) => {
        return {
            width: img.naturalWidth,
            height: img.naturalHeight
        }
    })

    await details.rotate()
    await details.shouldHaveRotated(before.width, before.height)
})

test('can favorite', async ({ page }) => {
    const user = new User(page)
    const favorites = user.favoritesView()

    await favorites.visit()

    const count = await favorites.getTeaserCount()

    const details = await favorites.getTeaser(0).click()

    await details.unfavorite()
    await page.keyboard.press('Escape')
    await favorites.shouldHaveTeasers(count - 1)
})

test('can archive', async ({ page }) => {
    const user = new User(page)
    const overview = user.overviewView()

    await overview.visit()

    const count = await overview.getTeaserCount()

    const details = await overview.getTeaser(3).click()

    const archive = await details.archive()

    await archive.shouldHaveTeasers(1)

    await archive.nav.visitOverview()
    await overview.shouldHaveTeasers(count - 1)
    await overview.nav.visitArchive()

    const archivedDetails = await overview.getTeaser(0).click()

    await archivedDetails.unarchive()

    await page.keyboard.press('Escape')

    await archive.shouldHaveTeasers(0)

    await archive.nav.visitOverview()
    await overview.shouldHaveTeasers(count)
})

test('can download', async ({ page }) => {
    const user = new User(page)
    const details = user.detailView(predefinedMediumUUIDs[0])

    await details.visit()
    await details.download()
})

test('can navigate to album', async ({ page }) => {
    const user = new User(page)
    const details = user.detailView(predefinedMediumUUIDs[0])

    await details.visit()

    const album = await details.clickOnAnyAlbum()

    await album.back()
})
