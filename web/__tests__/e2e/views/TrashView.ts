import { MediaView } from './MediaView'
import type { User } from '../actors/user'
import { TrashRestoreDialog } from '../dialogs/TrashRestoreDialog'
import { TrashDeleteDialog } from '../dialogs/TrashDeleteDialog'
import { TrashEmptyDialog } from '../dialogs/TrashEmptyDialog'

export class TrashView extends MediaView {
    constructor (public user: User) {
        super(user, '/trash')
    }

    restoreSelected = async () => {
        await this.user.page.getByTestId('trash-restore').click()

        const dialog = new TrashRestoreDialog(this.user.page)

        await dialog.confirm()
    }

    deleteSelected = async () => {
        await this.user.page.getByTestId('trash-delete').click()

        const dialog = new TrashDeleteDialog(this.user.page)

        await dialog.confirm()
    }

    empty = async () => {
        await this.user.page.getByTestId('trash-empty').click()

        const dialog = new TrashEmptyDialog(this.user.page)

        await dialog.confirm()
    }
}
