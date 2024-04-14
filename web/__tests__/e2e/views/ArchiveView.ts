import { MediaView } from './MediaView'
import type { User } from '../actors/user'
export class ArchiveView extends MediaView {
    constructor (public user: User) {
        super(user, '/archive')
    }
}
