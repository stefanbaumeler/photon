import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { DeleteAlbumDialog, MoveToTrashDialog } from '@/components/dialogs'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { EKeyboardScope, ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useHotkey } from '@/hooks/hotkey'

type Props = {
    elements: string[]
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const MoveToTrashControl = ({
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

    useHotkey({
        key: 'Backspace',
        callback: action,
        scopes: EKeyboardScope.select,
        condition: !!shortcut
    })

    const label = selection.mode === ESelectionMode.ALBUMS ? t(ETrans.DELETE_THING, {
        thing: t(ETrans.ALBUM)
    }) : t(ETrans.DELETE)

    return <>
        {deleteAlbumDialogActive ? <DeleteAlbumDialog
            closeCallback={() => setDeleteAlbumDialogActive(false)}
            callback={actionCallback}
            id={elements}
        /> : null}
        {moveToTrashDialogActive ? <MoveToTrashDialog
            media={elements}
            closeCallback={() => setMoveToTrashDialogActive(false)}
            callback={async () => {
                await details.close()
                actionCallback()
            }}
        /> : null}
        {dropdown ? <DropdownItem item={{
            testId: 'move-to-trash',
            label,
            callback: action,
            shortcut: shortcut ? 'Backspace' : undefined
        }}
        /> : <Button
            testId="move-to-trash"
            hint={label}
            shortcut={shortcut ? 'Backspace' : undefined}
            onClick={action}
            icon={Icons.mdiTrashCanOutline}
            appearance={details.active ? {
                text: 'light'
            } : undefined}
        />}
    </>
}
