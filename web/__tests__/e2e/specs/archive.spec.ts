import { test, expect } from '@playwright/test'
import { globalBeforeEach } from '../support/common'

globalBeforeEach()

test('can archive and unarchive', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('teaser-check').first().click()

    await page.getByTestId('bulk-more').click()
    await page.getByTestId('archive').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(1)

    await page.getByTestId('teaser-check').first().click()

    await page.getByTestId('bulk-more').click()
    await page.getByTestId('unarchive').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(0)
})
