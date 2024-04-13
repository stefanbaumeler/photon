import { Page } from '@playwright/test'
export class Dialog {
    locator
    constructor (public page: Page) {
        this.locator = page.getByTestId('dialog')
    }
    confirm = async () => {
        await this.locator.getByTestId('confirm').click()
    }
}
