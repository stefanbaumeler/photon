import { GalleryView } from './GalleryView'
import type { User } from '../actors/user'

export class OverviewView extends GalleryView {
    constructor (public user: User) {
        super(user, '/')
    }
}
