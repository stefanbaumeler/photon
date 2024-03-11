import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useKeyboard } from '@/hooks'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DeleteAlbumDialog } from '@/dialogs/DeleteAlbumDialog'
import { MoveToTrashDialog } from '@/dialogs/MoveToTrashDialog'

type Props = {
    elements: string[]
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const DeleteControl = ({
    elements, dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const router = useRouter()

    const actionCallback = () => {
        if (selection.selected.size) {
            selection.clear()
        }
    }

    const [deleteAlbumDialogActive, setDeleteAlbumDialogActive] = useState(false)
    const [moveToTrashDialogActive, setMoveToTrashDialogActive] = useState(false)

    const action = () => {
        if (selection.mode === ESelectionMode.ALBUMS || router.pathname === '/albums') {
            setDeleteAlbumDialogActive(true)
        }
        else {
            setMoveToTrashDialogActive(true)
        }

        callback && callback()
    }

    useKeyboard('keyup', 'Backspace', shortcut && action)

    const label = selection.mode === ESelectionMode.ALBUMS ? t(ETrans.DELETE_THING, {
        thing: t(ETrans.ALBUM)
    }) : t(ETrans.DELETE)

    return <>
        <DeleteAlbumDialog
            closeCallback={() => setDeleteAlbumDialogActive(false)}
            callback={actionCallback}
            active={deleteAlbumDialogActive}
            id={elements}
        />
        <MoveToTrashDialog
            media={elements}
            closeCallback={() => setMoveToTrashDialogActive(false)}
            active={ moveToTrashDialogActive}
            callback={actionCallback}
        />
        {dropdown ? <DropdownItem item={{
            testId: 'move-to-trash',
            label,
            callback: action,
            shortcut: shortcut && 'Backspace'
        }}
        /> : <Button
            testId="move-to-trash"
            hint={label}
            shortcut={shortcut && 'Backspace'}
            onClick={action}
            icon={Icons.mdiTrashCanOutline}
            appearance={details.active && {
                text: 'light'
            }}
        />}
    </>
}
