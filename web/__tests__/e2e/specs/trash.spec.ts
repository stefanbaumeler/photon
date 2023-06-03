import { test, expect } from '@playwright/test'
import { globalBeforeEach } from '../support/common'

globalBeforeEach()

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('teaser-check').first().click()
    await page.getByTestId('teaser-check').nth(2).click()
    await page.getByTestId('teaser-check').nth(3).click()
    await page.getByTestId('move-to-trash').click()
    await page.getByTestId('move-to-trash-confirm').click()
    await page.getByTestId('nav-trash').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(3)
})

test('can restore items', async ({ page }) => {
    await page.getByTestId('teaser-check').first().click()
    await page.getByTestId('trash-restore').click()
    await page.getByTestId('trash-restore-confirm').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(2)
})

test('can delete selected', async ({ page }) => {
    await page.getByTestId('teaser-check').first().click()
    await page.getByTestId('trash-delete').click()
    await page.getByTestId('trash-delete-confirm').click()

    await expect(await page.getByTestId('teaser')).toHaveCount(2)
})

test('can empty trash', async ({ page }) => {
    await page.getByTestId('trash-empty').click()
    await page.getByTestId('trash-empty-confirm').click()
    await expect(await page.getByTestId('teaser')).toHaveCount(0)
})
