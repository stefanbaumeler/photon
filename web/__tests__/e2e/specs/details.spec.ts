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

    const teaser = overview.getTeaser(0)
    const details = await teaser.click()

    await details.shouldBeVisible()
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

    const teaser = overview.getTeaser(0)
    const details = await teaser.click()

    await details.next()
    await details.shouldBeMedium(ids[1])
    await details.prev()
    await details.shouldBeMedium(ids[0])
})

test('can open on album page', async ({ page }) => {
    const user = new User(page)
    const album = user.albumView(predefinedAlbumUUIDs[0])

    await album.visit()

    const teaser = album.getTeaser(0)
    const details = await teaser.click()

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

    await details.shouldShowAlbum('Test Album 0')
    await details.shouldShowCameraDetail('Google Pixel 6')
    await details.shouldShowCameraDetail('f/1.85')
    await details.shouldShowCameraDetail('ISO40')
    await details.shouldShowImageDetail('Test Image 0')
    await details.shouldShowImageDetail('12.5MP')
    await details.shouldShowImageDetail('4080×3072')
    await details.shouldBeOwnedBy('Test McTestFace')
    await details.shouldBeSharedWith('Test McTestFace')
})
