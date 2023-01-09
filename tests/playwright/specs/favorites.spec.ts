import { test, expect } from '@playwright/test'
import { globalBeforeEach, openDetails } from '../support/common'

globalBeforeEach()

test('can favorite and unfavorite', async ({ page }) => {
    await page.goto('/')

    await page.goto('/favorites')

    await expect(await page.getByTestId('teaser')).not.toHaveCount(0)
    const count = await page.getByTestId('teaser').count()

    await page.goto('/')

    await page.getByTestId('teaser-check').nth(3).click()
    await page.getByTestId('bulk-more').click()
    await page.getByTestId('favorite').click()

    await expect(await page.getByTestId('teaser').nth(3).getByTestId('favorite-mark')).toHaveCount(1)

    await page.getByTestId('nav-favorites').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(count + 1)

    await page.getByTestId('nav-index').click()
    await page.getByTestId('teaser-check').nth(3).click()
    await page.getByTestId('bulk-more').click()
    await page.getByTestId('unfavorite').click()

    await expect(await page.getByTestId('teaser').nth(3).getByTestId('favorite-mark')).toHaveCount(0)

    await page.getByTestId('nav-favorites').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(count)
})

test('can favorite and unfavorite on details page', async ({ page }) => {
    await page.goto('/')

    await openDetails(page)

    await page.getByTestId('details-unfavorite').click()
    await page.getByTestId('details-favorite').click()
})
