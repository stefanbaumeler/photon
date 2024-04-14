import { MediaView } from './MediaView'
import type { User } from '../actors/user'

export class AlbumView extends MediaView {
    constructor (public user: User, public id: string = '') {
        super(user, `/albums/${id}`)
    }
    back = async () => {
        await this.user.page.getByTestId('album-back').click()

        return this.user.albumsView()
    }
    setTitleTo = async (text: string) => {
        const title = this.user.page.getByTestId('album-title')
        await title.click()
        await title.clear()
        await title.fill(text)
    }
    save = async (redirect = false) => {
        await this.user.page.getByTestId('save-changes').click()

        if (redirect) {
            return this.user.albumsView()
        }
    }
    setCover = async () => {
        await this.user.page.getByTestId('album-more').click()
        await this.user.page.getByTestId('album-set-cover').click()
    }
}
