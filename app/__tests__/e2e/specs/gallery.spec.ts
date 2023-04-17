import { test, expect } from '@playwright/test'
import { globalBeforeEach } from '../support/common'

globalBeforeEach()

test('can shift select', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('teaser-check').first().click()

    const teasers = await page.getByTestId('teaser')

    await page.keyboard.down('Shift')
    await teasers.nth(3).hover()
    await teasers.nth(3).click()
    await page.keyboard.up('Shift')

    await expect(teasers.nth(2)).toHaveClass(/teaser--selected/)

    await page.keyboard.press('Escape')

    await expect(await page.getByTestId('content-root')).not.toHaveClass(/root--selecting/)
})

test('can select section', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('gallery-section').first().hover()

    await page.getByTestId('gallery-section-check').first().click()
    const teasers = await page.getByTestId('gallery-section-check').getByTestId('teaser').elementHandles()

    for (const teaser of teasers) {
        expect(teaser.getAttribute('class')).toContain('teaser--selected')
    }
})

test('can select on details page', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('teaser-check').first().click()
    await page.getByTestId('teaser-details-fallback').first().click()

    await expect(await page.getByTestId('details')).toBeVisible()

    await page.getByTestId('details-select').first().click()

    await page.keyboard.press('Escape')

    await expect(await page.getByTestId('teaser').first()).not.toHaveClass(/teaser--selected/)
})

test('can sort', async ({ page }) => {
    // TODO
})

test('can rotate', async ({ page }) => {
    // TODO
    // await page.goto('/')
    //
    // await openDetails(page)
    //
    // const beforeSrc = await page.getByTestId('details-image').getAttribute('src')
    //
    // await page.getByTestId('details-more').click()
    // await page.getByTestId('rotate').click()
    //
    // const afterSrc = await page.getByTestId('details-image').getAttribute('src')
    //
    // console.log(beforeSrc, afterSrc)
    //
    // await expect(beforeSrc).not.toBe(afterSrc)
})
