import { VisitableView } from './VisitableView'
import type { User } from '../actors/user'
import { ElementHandle, expect } from '@playwright/test'
import fs from 'fs'

export class DetailView extends VisitableView {
    locator
    constructor (public user: User, public id: string = '') {
        super(user, `/media/${id}`)

        this.locator = this.user.page.getByTestId('details')
    }
    hideInfos = async () => {
        await this.locator.getByTestId('hide-infos').click()
        await expect(this.locator).not.toHaveClass(/details--infos/)
    }
    showInfos = async () => {
        await this.locator.getByTestId('show-infos').click()
        await expect(this.locator).toHaveClass(/details--infos/)
    }
    next = async () => {
        await this.locator.getByTestId('next-medium').click()
    }
    prev = async () => {
        await this.locator.getByTestId('prev-medium').click()
    }
    unfavorite = async () => {
        await this.locator.getByTestId('unfavorite').click()
    }
    select = async () => {
        await this.locator.getByTestId('details-select').click()
    }
    rotate = async () => {
        await this.locator.getByTestId('details-more').click()
        await this.locator.getByTestId('rotate').click()
    }
    archive = async () => {
        await this.locator.getByTestId('details-more').click()
        await this.locator.getByTestId('archive').click()

        return this.user.archiveView()
    }
    unarchive = async () => {
        await this.locator.getByTestId('details-more').click()
        await this.locator.getByTestId('unarchive').click()
    }
    download = async () => {
        const downloadPromise = this.user.page.waitForEvent('download')

        await this.locator.getByTestId('download').click()

        const download = await downloadPromise

        expect((await fs.promises.stat(await download.path())).size).toBeGreaterThan(1000000)
    }
    getMedium = async () => {
        const image = await this.locator.getByTestId('details-image').elementHandle() as ElementHandle<HTMLImageElement>
        await expect.poll(() => image.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0)

        return image
    }
    clickOnAnyAlbum = async () => {
        await this.locator.getByTestId('album-detail').first().click()

        return this.user.albumView()
    }
    shouldHaveRotated = async (beforeWidth: number, beforeHeight: number) => {
        const image = await this.getMedium()
        await expect.poll(() => image.evaluate((img) => img.naturalWidth)).not.toBe(beforeWidth)

        const after = await image.evaluate((img) => {
            return {
                width: img.naturalWidth,
                height: img.naturalHeight
            }
        })

        expect(beforeWidth).toBe(after.height)
        expect(beforeHeight).toBe(after.width)
    }
    shouldBeMedium = async (id: string) => {
        const image = this.locator.getByTestId('details-image')

        await expect.poll(async () => await image.getAttribute('src')).toContain(id)
        await image.evaluate((img: HTMLImageElement) => img.complete)

        expect(this.user.page.url()).toContain(id)
    }
    shouldBeHidden = async () => {
        await expect(this.locator).toBeHidden()
    }
    shouldBeVisible = async () => {
        await expect(this.locator).toBeVisible()
        await this.user.page.waitForURL('**/media/**')
    }
    shouldShowAlbum = async (title: string) => {
        await expect(this.locator.getByTestId('album-detail')).not.toHaveCount(0)
        await expect(this.locator.getByTestId('album-detail').first()).toContainText(title)
    }
    shouldShowCameraDetail = async (value: string) => {
        await expect(this.locator.getByTestId('camera-detail')).toContainText(value)
    }
    shouldShowImageDetail = async (value: string) => {
        await expect(this.locator.getByTestId('image-detail')).toContainText(value)
    }
    shouldBeOwnedBy = async (value: string) => {
        await expect(this.locator.getByTestId('owner-detail')).toContainText(value)
    }
    shouldBeSharedWith = async (value: string) => {
        await expect(this.locator.getByTestId('shares-detail')).toContainText(value)
    }
}
