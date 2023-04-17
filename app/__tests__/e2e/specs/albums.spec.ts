import { test, expect, Page } from '@playwright/test'
import { predefinedAlbumUUIDs } from '../../../../api/src/database/helpers/ids'
import { globalBeforeEach } from '../support/common'

globalBeforeEach()

const getAlbumTeaserCount = async (page: Page) => {
    await expect.poll(async () => await page.getByTestId('album-teaser').count()).toBeGreaterThan(0)

    return await page.getByTestId('album-teaser').count()
}

test('can delete', async ({ page }) => {
    await page.goto('/albums')

    const count = await getAlbumTeaserCount(page)

    await page.getByTestId('album-controls').first().click()
    await page.getByTestId('album-delete').first().click()
    await page.getByTestId('album-confirm-delete').click()

    await expect.poll(async () => await page.getByTestId('album-teaser').count()).toBe(count - 1)
})

test('can create from media', async ({ page }) => {
    await page.goto('/albums')

    const count = await getAlbumTeaserCount(page)

    await page.goto('/')

    await page.waitForTimeout(4000)

    await page.getByTestId('teaser-check').first().click()
    await page.getByTestId('teaser-check').last().click()

    await page.getByTestId('add-to').click()

    await page.getByTestId('thumbnail-new').click()
    await page.waitForNavigation()

    expect(page.url()).toContain('/albums/')
    await expect(await page.getByTestId('teaser')).toHaveCount(2)

    await page.getByTestId('album-back').click()

    await expect(await page.getByTestId('album-teaser')).toHaveCount(count + 1)
})

test('can create empty', async ({ page }) => {
    await page.goto('/albums')

    const count = await getAlbumTeaserCount(page)

    await page.getByTestId('album-create').click()
    await page.getByTestId('album-back').click()

    await expect(await page.getByTestId('album-teaser')).toHaveCount(count + 1)
})

test('can add media and avoids duplicates', async ({ page }) => {
    await page.goto(`/albums/${predefinedAlbumUUIDs[3]}`)

    await expect.poll(async () => await page.getByTestId('teaser').count()).toBeGreaterThan(0)
    const count = await page.getByTestId('teaser').count()

    for (let i = 0; i < 2; i++) {
        await page.goto('/')
        await page.getByTestId('teaser-check').nth(3).click()

        await page.getByTestId('add-to').click()
        await page.getByText('Test Album 3').click()

        await page.waitForNavigation()

        await expect.poll(async () => await page.getByTestId('teaser').count()).toEqual(count + 1)
    }
})

test('can remove media and change title', async ({ page }) => {
    await page.goto(`/albums/${predefinedAlbumUUIDs[0]}`)

    await expect.poll(async () => await page.getByTestId('teaser').count()).toBeGreaterThan(0)
    const count = await page.getByTestId('teaser').count()

    await page.getByTestId('album-title').click()
    await page.getByTestId('album-title').clear()
    await page.getByTestId('album-title').type('Changed Title')
    await page.getByTestId('teaser').first().click()

    await expect.poll(async () => await page.getByTestId('teaser').count()).toEqual(count - 1)

    await page.getByTestId('save-changes').click()
    await page.getByTestId('album-back').click()

    expect(await page.getByTestId('Changed Title')).toBeDefined()
})

test('can set cover', async ({ page }) => {
    await page.goto(`/albums/${predefinedAlbumUUIDs[0]}`)
    await page.getByTestId('album-more').click()
    await page.getByTestId('album-set-cover').click()
    await page.getByTestId('teaser').last().click()

    const src = await page.getByTestId('teaser-image').last().getAttribute('src')
    const split = src.split(/[/?]/g)
    const id = split[split.length - 2]

    await page.getByTestId('save-changes').click()

    const link = await page.locator(`[href="/albums/${predefinedAlbumUUIDs[0]}"]`)
    const imageSrc = await link.getByTestId('album-image').getAttribute('src')

    expect(imageSrc).toContain(id)
})
