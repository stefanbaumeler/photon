import { expect } from '@playwright/test'
import type { User } from '../actors/user'
import { MoveToTrashDialog } from '../dialogs/MoveToTrashDialog'
export class SelectionComponent {
    locator
    constructor (public user: User) {
        this.locator = user.page.getByTestId('selection')
    }

    addTo = async (index: number | 'new') => {
        await this.locator.getByTestId('add-to').click()
        await expect(this.user.page.getByTestId('thumbnail')).not.toHaveCount(0)

        if (index === 'new') {
            await this.user.page.getByTestId('thumbnail-new').click()
        }
        else {
            await this.user.page.getByTestId('thumbnail').nth(index).click()
        }

        return this.user.albumView()
    }

    download = async () => {

    }

    moveToTrash = async () => {
        await this.locator.getByTestId('move-to-trash').click()

        const dialog = new MoveToTrashDialog(this.user.page)

        await dialog.confirm()
    }

    archive = async () => {
        await this.locator.getByTestId('bulk-more').click()
        await this.locator.getByTestId('archive').click()

        return this.user.archiveView()
    }

    unarchive = async () => {
        await this.locator.getByTestId('bulk-more').click()
        await this.locator.getByTestId('unarchive').click()
    }

    favorite = async () => {
        await this.locator.getByTestId('bulk-more').click()
        await this.locator.getByTestId('favorite').click()
    }

    unfavorite = async () => {
        await this.locator.getByTestId('bulk-more').click()
        await this.locator.getByTestId('unfavorite').click()
    }
}
