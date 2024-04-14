import type { User } from '../actors/user'

export class NavComponent {
    locator
    constructor (public user: User) {
        this.locator = user.page.getByTestId('sidebar')
    }

    visitOverview = async () => {
        await this.locator.getByTestId('nav-index').click()
        await this.user.page.waitForURL('/')

        return this.user.overviewView()
    }

    visitTrash = async () => {
        await this.locator.getByTestId('nav-trash').click()
        await this.user.page.waitForURL('/trash')

        return this.user.trashView()
    }

    visitFavorites = async () => {
        await this.locator.getByTestId('nav-favorites').click()
        await this.user.page.waitForURL('/favorites')

        return this.user.favoritesView()
    }

    visitAlbums = async () => {
        await this.locator.getByTestId('nav-albums').click()
        await this.user.page.waitForURL('/albums')

        return this.user.albumsView()
    }

    visitArchive = async () => {
        await this.locator.getByTestId('nav-archive').click()
        await this.user.page.waitForURL('/archive')

        return this.user.albumsView()
    }
}
