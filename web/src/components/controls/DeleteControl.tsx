import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useKeyboard } from '@/hooks'
import { useDeleteAlbumDialog, useMoveToTrashDialog } from '@/dialogs'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'

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

    const deleteAlbumDialog = useDeleteAlbumDialog({
        id: elements,
        callback: actionCallback
    })

    const moveToTrashDialog = useMoveToTrashDialog({
        media: elements,
        callback: actionCallback
    })

    const action = () => {
        if (selection.mode === ESelectionMode.ALBUMS || router.pathname === '/albums') {
            deleteAlbumDialog()
        }
        else {
            moveToTrashDialog()
        }

        callback && callback()
    }

    useKeyboard('keyup', 'Backspace', shortcut && action)

    const label = selection.mode === ESelectionMode.ALBUMS ? t(ETrans.DELETE_THING, {
        thing: t(ETrans.ALBUM)
    }) : t(ETrans.DELETE)

    if (dropdown) {
        return <DropdownItem item={{
            testId: 'move-to-trash',
            label,
            callback: action,
            shortcut: shortcut && 'Backspace'
        }}
        />
    }

    return <Button
        testId="move-to-trash"
        hint={label}
        shortcut={shortcut && 'Backspace'}
        onClick={action}
        icon={Icons.mdiTrashCanOutline}
        appearance={details.active && {
            text: 'light'
        }}
    />
}
