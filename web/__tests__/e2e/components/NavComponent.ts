import type { User } from '../actors/user'

export class NavComponent {
    locator
    constructor (public user: User) {
        this.locator = user.page.getByTestId('sidebar')
    }

    visitOverview = async () => {
        await this.locator.getByTestId('nav-index').click()

        return this.user.overviewView()
    }

    visitTrash = async () => {
        await this.locator.getByTestId('nav-trash').click()

        return this.user.trashView()
    }

    visitFavorites = async () => {
        await this.locator.getByTestId('nav-favorites').click()

        return this.user.favoritesView()
    }

    visitAlbums = async () => {
        await this.locator.getByTestId('nav-albums').click()

        return this.user.albumsView()
    }
}
