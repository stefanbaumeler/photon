import { test, Page } from '@playwright/test'
import { globalBeforeEach } from '../support/common'

globalBeforeEach()

const goToListView = async (page: Page) => {
    await page.goto('/')

    await page.getByTestId('view-control').first().click()
    await page.getByTestId('list-view').first().click()
}

test('can select', async ({ page }) => {
    await goToListView(page)
})

test('can sort', async ({ page }) => {
    // TODO
})
