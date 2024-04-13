import { User } from '@/__tests__/e2e/actors/user'

export class SearchComponent {
    locator
    constructor (public user: User) {
        this.locator = user.page.getByTestId('search')
    }

    search = async (query: string) => {
        await this.locator.getByTestId('search-input').fill(query)
        await this.user.page.keyboard.press('Enter')
    }
}
