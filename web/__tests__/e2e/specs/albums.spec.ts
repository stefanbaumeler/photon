import { test } from '@playwright/test'
import { predefinedAlbumUUIDs } from '../../../../api/src/database/helpers/ids'
import { globalBeforeEach } from '../support/common'
import { User } from '../actors/user'

globalBeforeEach()

test('can delete', async ({ page }) => {
    const user = new User(page)
    const albums = user.albumsView()

    await albums.visit()

    const count = await albums.getTeaserCount()

    const teaser = albums.getTeaser(0)

    const dialog = await teaser.moveToTrash()

    await dialog.confirm()
    await albums.shouldHaveTeasers(count - 1)
})

test('can create from media', async ({ page }) => {
    const user = new User(page)
    const albums = user.albumsView()

    await albums.visit()

    const count = await albums.getTeaserCount()
    const overview = await albums.nav.visitOverview()

    await overview.selectTeaser(0)
    await overview.selectTeaser(1)

    const album = await overview.selection.addTo('new')

    await album.shouldHaveTeasers(2)

    const albumsAfterCreation = await album.back()
    await albumsAfterCreation.shouldHaveTeasers(count + 1)
})

test('can create empty', async ({ page }) => {
    const user = new User(page)
    const albums = user.albumsView()

    await albums.visit()

    const count = await albums.getTeaserCount()
    const album = await albums.create()

    await album.back()

    await albums.shouldHaveTeasers(count + 1)
})

test('can add media and avoid duplicates', async ({ page }) => {
    const user = new User(page)
    const album = user.albumView(predefinedAlbumUUIDs[3])

    await album.visit()

    const count = await album.getTeaserCount()

    for (let i = 0; i < 2; i++) {
        const overview = await album.nav.visitOverview()
        await overview.selectTeaser(3)

        const albumAfterAdding = await overview.selection.addTo(3)

        await albumAfterAdding.shouldHaveTeasers(count + 1)
    }
})

test('can remove media and change title', async ({ page }) => {
    const title = 'Changed Title'

    const user = new User(page)
    const album = user.albumView(predefinedAlbumUUIDs[0])

    await album.visit()

    const count = await album.getTeaserCount()

    await album.setTitleTo(title)

    const teaser = album.getTeaser(0)

    await teaser.click()
    await album.save()

    await album.shouldHaveTeasers(count - 1)

    const albums = await album.back()

    await albums.shouldHaveAlbum(-1, title)
})

test('can set cover', async ({ page }) => {
    const user = new User(page)
    const album = user.albumView(predefinedAlbumUUIDs[0])

    await album.visit()

    await album.setCover()
    const teaser = album.getTeaser(-1)

    await teaser.click()

    const src = await teaser.getSrc()
    const split = src.split(/[/?]/g)
    const id = split[split.length - 2]

    const albums = await album.save(true)

    const albumTeaser = albums.getTeaser(-1)

    await page.waitForURL('**/albums')

    await albumTeaser.shouldHaveSrc(id)
})
