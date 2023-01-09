import { test, expect } from '@playwright/test'
import { globalBeforeEach, openDetails } from '../support/common'

globalBeforeEach()

test('can navigate using keyboard', async ({ page }) => {
    await page.goto('/')

    const ids = await openDetails(page, true)

    await page.keyboard.press('ArrowRight')

    const image = await page.getByTestId('details-image')
    let src = await image.getAttribute('src')

    await expect(page.url()).toContain(ids[1])
    await expect(src).toContain(ids[1])

    await page.keyboard.press('ArrowLeft')

    src = await image.getAttribute('src')

    await expect(page.url()).toContain(ids[0])
    await expect(src).toContain(ids[0])

    await page.keyboard.press('Escape')

    await expect(await page.getByTestId('details')).toBeHidden()
})

test('can navigate using buttons', async ({ page }) => {
    await page.goto('/')

    const ids = await openDetails(page, true)

    await page.getByTestId('next-medium').click()

    const image = await page.getByTestId('details-image')
    let src = await image.getAttribute('src')

    await expect(page.url()).toContain(ids[1])
    await expect(src).toContain(ids[1])

    await page.getByTestId('prev-medium').click()

    src = await image.getAttribute('src')

    await expect(page.url()).toContain(ids[0])
    await expect(src).toContain(ids[0])
})

test('can open and close infos', async ({ page }) => {
    await page.goto('/')

    await openDetails(page)

    await page.getByTestId('hide-infos').click()

    const details = await page.getByTestId('details')

    await expect(details).not.toHaveClass(/details--infos/)
    await page.getByTestId('show-infos').click()

    await expect(details).toHaveClass(/details--infos/)
})
