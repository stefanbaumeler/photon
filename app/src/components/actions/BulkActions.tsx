import * as Icons from '@mdi/js'
import { Dropdown, IconButton } from '@/components'
import { useContext, useState } from 'react'
import { SelectionContext } from '@/providers'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EMediumStatus, ESelectionMode } from '@/types/app'
import useAddToAlbumDialog from '@/dialogs/add-to-album'
import useSetMediaStatus from '@/hooks/set-status'
import useMoveToTrashDialog from '@/dialogs/move-to-trash'
import { useRouter } from 'next/router'
import useDeleteMediaDialog from '@/dialogs/delete-media'
import useRestoreMediaDialog from '@/dialogs/restore-media'
import bem from '@/util/bem'

const BulkActions = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const selection = useContext(SelectionContext)

    const trashMediaDialog = useMoveToTrashDialog(selection.selected)
    const deleteMediaDialog = useDeleteMediaDialog()
    const restoreMediaDialog = useRestoreMediaDialog(selection.selected)
    const archive = useSetMediaStatus(selection.selected, Array.from(selection.selected)[0]?.status === EMediumStatus.ARCHIVED ? EMediumStatus.DEFAULT : EMediumStatus.ARCHIVED)
    const [moreActive, setMoreActive] = useState(false)

    const download = () => {

    }

    const addToAlbumDialog = useAddToAlbumDialog()

    if (selection.mode !== ESelectionMode.SELECT) {
        return <></>
    }

    const moreItems = [
        {
            label: Array.from(selection.selected)[0]?.status === EMediumStatus.ARCHIVED ? t(ETrans.UNARCHIVE) : t(ETrans.MOVE_TO_ARCHIVE),
            callback: archive
        }
    ]

    const RegularActions = () => {
        return <>
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
                cy={'move-to-trash'}
                hint={t(ETrans.DELETE)}
                onClick={trashMediaDialog}
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
        </>
    }

    const TrashActions = () => {
        return <>
            <IconButton
                label={t(ETrans.DELETE)}
                onClick={deleteMediaDialog}
                icon={Icons.mdiDeleteForever}
                cy={'trash-delete'}
            />
            <IconButton
                label={t(ETrans.RESTORE)}
                onClick={restoreMediaDialog}
                icon={Icons.mdiDeleteRestore}
                cy={'trash-restore'}
            />
        </>
    }

    const Actions = () => {
        if (router.pathname === '/trash') {
            return <TrashActions />
        }
        else {
            return <RegularActions />
        }
    }

    const classes = bem('actions', [
        ['labeled', router.pathname === '/trash']
    ])

    return <div className={classes}>
        <span
            className="actions__count"
            data-cy="select-count"
        >
            {t(ETrans.N_SELECTED, {
                n: selection.selected.size
            })}
        </span>
        <Actions />
    </div>
}

export default BulkActions
