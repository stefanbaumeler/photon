import { expect, Locator } from '@playwright/test'
import { DeleteAlbumDialog } from '../dialogs/DeleteAlbumDialog'
import { MoveToTrashDialog } from '../dialogs/MoveToTrashDialog'
import type { User } from '../actors/user'

export class TeaserComponent {
    locator
    constructor (public user: User, public index: number, public isAlbum: boolean) {
        this.locator = this.user.page.getByTestId('teaser').nth(index)
    }
    select = async () => {
        const selector = this.locator.getByTestId('teaser-check')
        await selector.hover()
        await selector.click()
    }
    moveToTrash = async () => {
        await this.locator.getByTestId('teaser-nav').first().click()
        await this.locator.getByTestId('move-to-trash').first().click()

        if (this.isAlbum) {
            return new DeleteAlbumDialog(this.locator.page())
        }

        return new MoveToTrashDialog(this.locator.page())
    }

    click = async () => {
        await this.locator.hover()
        await this.locator.click()
        return this.user.detailView()
    }

    openSelected = async () => {
        await this.locator.getByTestId('teaser-details-fallback').first().click()

        return this.user.detailView()
    }

    getSrc = async () => {
        return await this.locator.getByTestId('teaser-image').first().getAttribute('src')
    }

    shouldHaveSrc = async (src: string) => {
        const imageSrc = await this.locator.getByTestId('teaser-image').getAttribute('src')

        expect(imageSrc).toContain(src)
    }

    shouldBeFavorite = async () => {
        await expect(this.locator.getByTestId('favorite-mark')).toHaveCount(1)
    }

    shouldNotBeFavorite = async () => {
        await expect(this.locator.getByTestId('favorite-mark')).toHaveCount(0)
    }

    shouldBeSelected = async () => {
        await expect(this.locator).toHaveClass(/teaser--selected/)
    }

    shouldNotBeSelected = async () => {
        await expect(this.locator).not.toHaveClass(/teaser--selected/)
    }
}
