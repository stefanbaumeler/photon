import { MediaView } from './MediaView'
import type { User } from '../actors/user'
export class FavoritesView extends MediaView {
    constructor (public user: User) {
        super(user, '/favorites')
    }
}
