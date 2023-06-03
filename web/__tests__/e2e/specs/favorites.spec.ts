import { test, expect } from '@playwright/test'
import { globalBeforeEach, openDetails } from '../support/common'

globalBeforeEach()

test('can favorite and unfavorite', async ({ page }) => {
    await page.goto('/favorites')

    await expect.poll(async () => await page.getByTestId('teaser').count()).toBeGreaterThan(0)
    const count = await page.getByTestId('teaser').count()

    await page.goto('/')

    await page.getByTestId('teaser-check').nth(3).click()
    await page.getByTestId('bulk-more').click()
    await page.getByTestId('favorite').click()

    await expect(await page.getByTestId('teaser').nth(3).getByTestId('favorite-mark')).toHaveCount(1)

    await page.getByTestId('nav-favorites').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(count + 1)

    await page.goto('/')
    await page.getByTestId('teaser-check').nth(3).click()
    await page.getByTestId('bulk-more').click()

    await page.getByTestId('unfavorite').click()

    await expect.poll(async () => await page.getByTestId('favorite-mark').count()).toBeGreaterThan(0)

    await page.getByTestId('nav-favorites').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(count)
})

test('can unfavorite on favorites details page', async ({ page }) => {
    await page.goto('/favorites')
    await expect.poll(async () => await page.getByTestId('teaser').count()).toBeGreaterThan(0)
    const count = await page.getByTestId('teaser').count()

    await openDetails(page)

    await page.getByTestId('details-unfavorite').click()
    await page.keyboard.press('Escape')

    await expect(await page.getByTestId('teaser')).toHaveCount(count - 1)
})
