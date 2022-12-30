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
import bem from '@/util/bem'
import TrashActions from './TrashActions'
import useAddToFavorites from '@/hooks/add-to-favorites'
import useRemoveFromFavorites from '@/hooks/remove-from-favorites'

export const BulkActions = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const selection = useContext(SelectionContext)

    const trashMediaDialog = useMoveToTrashDialog(selection.selected)
    const archive = useSetMediaStatus(selection.selected, Array.from(selection.selected)[0]?.status === EMediumStatus.ARCHIVED ? EMediumStatus.ALL : EMediumStatus.ARCHIVED)
    const [moreActive, setMoreActive] = useState(false)

    const addToAlbumDialog = useAddToAlbumDialog()
    const addToFavorites = useAddToFavorites(Array.from(selection.selected).map((selected) => selected.id))
    const removeFromFavorites = useRemoveFromFavorites(Array.from(selection.selected).map((selected) => selected.id))

    if (selection.mode !== ESelectionMode.SELECT) {
        return <></>
    }

    const selectionContainsUnfavorited = Array.from(selection.selected).find((selected) => selected.favoredBy.length === 0)

    const moreItems = [
        {
            cy: 'move-to-archive',
            label: Array.from(selection.selected)[0]?.status === EMediumStatus.ARCHIVED ? t(ETrans.UNARCHIVE) : t(ETrans.MOVE_TO_ARCHIVE),
            callback: archive
        },
        selectionContainsUnfavorited ? {
            label: t(ETrans.FAVORITE),
            callback: addToFavorites
        } : {
            label: t(ETrans.UNFAVORITE),
            callback: removeFromFavorites
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
                    cy="bulk-more"
                    hint={t(ETrans.MORE_OPTIONS)}
                    icon={Icons.mdiDotsVertical}
                    onClick={() => setMoreActive(!moreActive)}
                />
            </Dropdown>
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
