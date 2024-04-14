import { MediaView } from './MediaView'
import type { User } from '../actors/user'
import { expect } from '@playwright/test'
export class AlbumsView extends MediaView {
    constructor (public user: User) {
        super(user, '/albums', true)
    }

    shouldHaveAlbum = async (title: string) => {
        await expect(this.user.page.getByText(title)).toHaveCount(1)
    }
}
