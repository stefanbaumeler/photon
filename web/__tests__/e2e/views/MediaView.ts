import { VisitableView } from './VisitableView'
import { expect } from '@playwright/test'
import { TeaserComponent } from '../components/TeaserComponent'
import { SelectionComponent } from '../components/SelectionComponent'
import { ActionsComponent } from '../components/ActionsComponent'
import type { User } from '../actors/user'

export class MediaView extends VisitableView {
    selection
    actions
    constructor (public user: User, public path: string, public isAlbum = false) {
        super(user, path)

        this.selection = new SelectionComponent(user)
        this.actions = new ActionsComponent(user)
    }
    selectTeaser = async (index: number) => {
        const teaser = this.getTeaser(index)
        await teaser.select()

        return teaser
    }
    selectSection = async (index: number) => {
        await this.user.page.getByTestId('gallery-section').nth(index).hover()
        await this.user.page.getByTestId('gallery-section-check').nth(index).click()

        const teasers = await this.user.page.getByTestId('gallery-section-check').getByTestId('teaser').elementHandles()

        for (const teaser of teasers) {
            expect(teaser.getAttribute('class')).toContain('teaser--selected')
        }
    }
    shouldHaveTeasers = async (n: number) => {
        await expect(this.user.page.getByTestId('teaser')).toHaveCount(n)
    }
    getTeaserCount = async () => {
        await expect.poll(async () => await this.user.page.getByTestId('teaser').count()).toBeGreaterThan(0)

        return await this.user.page.getByTestId('teaser').count()
    }
    getTeaser = (index: number) => {
        return new TeaserComponent(this.user, index, this.isAlbum)
    }

    create = async () => {
        await this.user.page.getByTestId('album-create').click()

        return this.user.albumView()
    }

    getDetailIds = async () => {
        const ids = []

        await expect.poll(async () => await this.user.page.getByTestId('teaser-image').count()).toBeGreaterThan(0)

        const images = await this.user.page.getByTestId('teaser-image').elementHandles()

        for (const el of images) {
            const src = await el.getAttribute('src')
            const split = src.split(/[/?]/g)
            const id = split[split.length - 2]
            ids.push(id)
        }

        return ids
    }
}
