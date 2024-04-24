import { ElementHandle, expect, test } from '@playwright/test'
import { DeleteAlbumDialog } from '../dialogs/DeleteAlbumDialog'
import { MoveToTrashDialog } from '../dialogs/MoveToTrashDialog'
import type { User } from '../actors/user'
import fs from 'fs'

export class TeaserComponent {
    locator

    constructor (public user: User, public index: number, public isAlbum: boolean) {
        this.locator = this.user.page.getByTestId('teaser').nth(index)
    }
    select = async () => {
        const selector = this.locator.getByTestId('teaser-check')
        await selector.hover()
        await selector.click()
        await this.shouldBeSelected()
    }
    moveToTrash = async () => {
        await this.locator.getByTestId('teaser-nav').click()
        await this.locator.getByTestId('move-to-trash').click()

        if (this.isAlbum) {
            return new DeleteAlbumDialog(this.locator.page())
        }

        return new MoveToTrashDialog(this.locator.page())
    }

    archive = async () => {
        await this.locator.getByTestId('teaser-nav').click()
        await this.locator.getByTestId('archive').click()

        await this.user.page.waitForURL('/archive')

        return this.user.archiveView()
    }

    unarchive = async () => {
        await this.locator.getByTestId('teaser-nav').click()
        await this.locator.getByTestId('unarchive').click()
    }

    favorite = async (view: string) => {
        if (view === 'gallery') {
            await this.locator.getByTestId('teaser-nav').click()
        }

        await this.locator.getByTestId('favorite').click()
        await this.shouldBeFavorite(view)
    }

    unfavorite = async (view: string) => {
        if (view === 'gallery') {
            await this.locator.getByTestId('teaser-nav').click()
        }

        await this.locator.getByTestId('unfavorite').click()
        await this.shouldNotBeFavorite(view)
    }

    rotate = async () => {
        await this.locator.getByTestId('teaser-nav').click()
        await this.locator.getByTestId('rotate').click()
    }

    click = async () => {
        await this.locator.hover()
        await this.locator.click()
        return this.user.detailView()
    }

    download = async (view: string) => {
        const downloadPromise = this.user.page.waitForEvent('download')

        if (view === 'gallery') {
            await this.locator.getByTestId('teaser-nav').click()
        }

        await this.locator.getByTestId('download').click()

        const download = await downloadPromise

        expect((await fs.promises.stat(await download.path())).size).toBeGreaterThan(1000000)
    }

    openSelected = async () => {
        await this.locator.getByTestId('teaser-details-fallback').first().click()

        return this.user.detailView()
    }

    getSrc = async () => {
        const src = await this.locator.getByTestId('teaser-image').first().getAttribute('src')

        if (!src) {
            test.fail()
            return ''
        }

        return src
    }

    getMedium = async () => {
        const image = await this.locator.getByTestId('teaser-image').elementHandle() as ElementHandle<HTMLImageElement>

        await expect.poll(() => {
            return image.evaluate((img) => {
                return img.naturalWidth
            })
        }).toBeGreaterThan(0)

        return image
    }

    shouldHaveSrc = async (src: string) => {
        const image = await this.locator.getByTestId('teaser-image')
        await image.evaluate((img: HTMLImageElement) => img.complete)
        await expect.poll(async () => await image.getAttribute('src')).toContain(src)
    }

    shouldBeFavorite = async (view: string) => {
        if (view === 'gallery') {
            await expect(this.locator.getByTestId('favorite-mark')).toHaveCount(1)
        }

        if (view === 'list') {
            await expect(this.locator.getByTestId('unfavorite')).toHaveCount(1)
        }
    }

    shouldNotBeFavorite = async (view: string) => {
        if (view === 'gallery') {
            await expect(this.locator.getByTestId('favorite-mark')).toHaveCount(0)
        }

        if (view === 'list') {
            await expect(this.locator.getByTestId('favorite')).toHaveCount(1)
        }
    }

    shouldBeSelected = async () => {
        await expect(this.locator.getByTestId('teaser-check')).toHaveClass(/check--checked/)
    }

    shouldNotBeSelected = async () => {
        await expect(this.locator).not.toHaveClass(/teaser--selected/)
    }

    shouldHaveRotated = async (beforeWidth: number, beforeHeight: number) => {
        const image = await this.getMedium()

        await expect.poll(() => image.evaluate((img) => {
            return img.naturalHeight
        })).not.toBe(beforeHeight)

        await expect.poll(() => image.evaluate((img) => {
            return img.naturalHeight
        })).not.toBe(0)

        const after = await image.evaluate((img) => {
            return {
                width: img.naturalWidth,
                height: img.naturalHeight
            }
        })

        expect(after.height).not.toBe(beforeHeight)
        expect(after.width).not.toBe(beforeWidth)
    }
}
