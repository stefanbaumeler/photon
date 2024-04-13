import { GalleryView } from './GalleryView'
import type { User } from '../actors/user'
export class FavoritesView extends GalleryView {
    constructor (public user: User) {
        super(user, '/favorites')
    }
}
