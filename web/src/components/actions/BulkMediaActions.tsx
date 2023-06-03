import * as Icons from '@mdi/js'
import { Dropdown, IconButton } from '..'
import {  useState } from 'react'
import { useSelectionContext } from 'web/src/providers'
import { ETrans } from 'web/src/types/translations'
import { useTranslation } from 'react-i18next'
import { EMediumStatus, ESelectionMode } from 'web/src/types/app'
import useAddToAlbumDialog from '../../dialogs/add-to-album'
import useSetMediaStatus from '../../hooks/set-status'
import useMoveToTrashDialog from '../../dialogs/move-to-trash'
import { useRouter } from 'next/router'
import bem from '../../util/bem'
import TrashActions from './TrashActions'
import useAddToFavorites from '../../hooks/add-to-favorites'
import useRemoveFromFavorites from '../../hooks/remove-from-favorites'
import useDownload  from '../../hooks/download'
import { TMedium } from '@photon/schema'

type Props = {
    selected: TMedium[]
}

export const BulkMediaActions = ({ selected }: Props) => {
    const { t } = useTranslation()
    const router = useRouter()

    const selection = useSelectionContext()

    const trashMediaDialog = useMoveToTrashDialog(selected)
    const archive = useSetMediaStatus(selected, EMediumStatus.ARCHIVED)
    const unarchive = useSetMediaStatus(selected, EMediumStatus.ALL)

    const [moreActive, setMoreActive] = useState(false)

    const download = useDownload()

    const addToAlbumDialog = useAddToAlbumDialog()
    const addToFavorites = useAddToFavorites([...selected].map((selected) => selected.id))
    const removeFromFavorites = useRemoveFromFavorites([...selected].map((selected) => selected.id))

    if (selection.mode !== ESelectionMode.SELECT) {
        return <></>
    }

    const selectionContainsUnfavorited = [...selected].find((selected) => selected.favoredBy?.length === 0)

    const moreItems = [
        Array.from(selected)[0]?.status === EMediumStatus.ARCHIVED ? {
            testId: 'unarchive',
            label: t(ETrans.UNARCHIVE),
            callback: unarchive
        } : {
            testId: 'archive',
            label: t(ETrans.MOVE_TO_ARCHIVE),
            callback: archive
        },
        selectionContainsUnfavorited ? {
            testId: 'favorite',
            label: t(ETrans.FAVORITE),
            callback: addToFavorites
        } : {
            testId: 'unfavorite',
            label: t(ETrans.UNFAVORITE),
            callback: removeFromFavorites
        }
    ]

    const RegularActions = () => {
        return <>
            <IconButton
                testId="add-to"
                hint={t(ETrans.ADD_TO)}
                icon={Icons.mdiPlus}
                onClick={addToAlbumDialog}
            />
            <IconButton
                hint={t(ETrans.DOWNLOAD)}
                icon={Icons.mdiTrayArrowDown}
                onClick={download}
            />
            <IconButton
                testId="move-to-trash"
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
                    testId="bulk-more"
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
            data-testid="select-count"
        >
            {t(ETrans.N_SELECTED, {
                n: selected.length
            })}
        </span>
        <Actions />
    </div>
}
