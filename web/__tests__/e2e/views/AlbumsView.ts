import { GalleryView } from './GalleryView'
import type { User } from '../actors/user'
import { expect } from '@playwright/test'
export class AlbumsView extends GalleryView {
    constructor (public user: User) {
        super(user, '/albums', true)
    }

    shouldHaveAlbum = async (index: number, title: string) => {
        await expect(this.user.page.getByTestId('teaser').nth(index)).toContainText(title)
    }
}
