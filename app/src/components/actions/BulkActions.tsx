import * as Icons from '@mdi/js'
import { IconButton, Thumbnails } from '@/components'
import { useContext } from 'react'
import { SelectionContext } from '@/providers'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ESelectionMode } from '@/types/app'
import useDeleteMediaDialog from '@/dialogs/delete-media'
import useAddToAlbumDialog from '@/dialogs/add-to-album'

const BulkActions = () => {
    const { t } = useTranslation()

    const selection = useContext(SelectionContext)

    const deleteMediaDialog = useDeleteMediaDialog()

    const download = () => {

    }

    const addToAlbumDialog = useAddToAlbumDialog()

    if (selection.mode !== ESelectionMode.SELECT) {
        return <></>
    }

    return <div className="actions">
        <span className="actions__count">
            {t(ETrans.N_SELECTED, {
                n: selection.selected.size
            })}
        </span>
        <IconButton
            hint={t(ETrans.ADD_TO)}
            icon={Icons.mdiPlus}
            onClick={addToAlbumDialog}
        />
        <IconButton
            hint={t(ETrans.DOWNLOAD)}
            onClick={download}
            icon={Icons.mdiTrayArrowDown}
        />
        <IconButton
            hint={t(ETrans.DELETE)}
            onClick={deleteMediaDialog}
            icon={Icons.mdiTrashCanOutline}
        />
    </div>
}

export default BulkActions
