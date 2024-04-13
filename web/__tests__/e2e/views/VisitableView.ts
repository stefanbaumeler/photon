import type { User } from '../actors/user'
import { NavComponent } from '../components/NavComponent'
import { SearchComponent } from '@/__tests__/e2e/components/SearchComponent'
export class VisitableView {
    nav
    search
    constructor (public user: User, public path: string) {
        this.nav = new NavComponent(this.user)
        this.search = new SearchComponent(this.user)
    }

    visit = async () => {
        await this.user.page.goto(this.path)
    }
}
