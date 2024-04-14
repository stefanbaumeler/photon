import type { User } from '../actors/user'

export class ActionsComponent {
    locator
    constructor (public user: User) {
        this.locator = user.page.getByTestId('actions')
    }

    sortBy = async (sort: 'newest' | 'oldest' | 'recent') => {
        await this.locator.getByTestId('sort').click()
        await this.locator.getByTestId(`sort-${sort}`).click()
    }

    setView = async (view: string) => {
        await this.locator.getByTestId('view').click()
        await this.locator.getByTestId(`${view}-view`).click()
    }
}
