import * as Icons from '@mdi/js'
import { Dropdown, IconButton } from '@/components'
import { useContext, useState } from 'react'
import { SelectionContext } from '@/providers'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EMediumStatus, ESelectionMode } from '@/types/app'
import useDeleteMediaDialog from '@/dialogs/delete-media'
import useAddToAlbumDialog from '@/dialogs/add-to-album'
import useSetMediaStatus from '@/hooks/set-status'

const BulkActions = () => {
    const { t } = useTranslation()

    const selection = useContext(SelectionContext)

    const deleteMediaDialog = useDeleteMediaDialog()
    const archive = useSetMediaStatus(EMediumStatus.ARCHIVED)
    const [moreActive, setMoreActive] = useState(false)

    const download = () => {

    }

    const addToAlbumDialog = useAddToAlbumDialog()

    if (selection.mode !== ESelectionMode.SELECT) {
        return <></>
    }

    const moreItems = [
        {
            label: t(ETrans.MOVE_TO_ARCHIVE),
            callback: archive
        }
    ]

    return <div className="actions">
        <span
            className="actions__count"
            data-cy="select-count"
        >
            {t(ETrans.N_SELECTED, {
                n: selection.selected.size
            })}
        </span>
        <IconButton
            cy={'add-to'}
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
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
        >
            <IconButton
                hint={t(ETrans.MORE_OPTIONS)}
                icon={Icons.mdiDotsVertical}
                onClick={() => setMoreActive(!moreActive)}
            />
        </Dropdown>
    </div>
}

export default BulkActions
