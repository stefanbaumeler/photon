import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { TAlbum, TMedium } from '@photon/schema'
import { useKeyboard } from '@/hooks'
import { useDeleteAlbumDialog, useMoveToTrashDialog } from '@/dialogs'
import { isMedia } from '@/util/is'
import { useDetailsContext, useSelectionContext } from '@/providers'

type Props = {
    elements: (TMedium | TAlbum)[]
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

    const actionCallback = () => {
        if (selection.selected.size) {
            selection.clear()
        }
    }

    const deleteAlbumDialog = useDeleteAlbumDialog({
        id: elements.map(({ id }) => id),
        callback: actionCallback
    })

    const moveToTrashDialog = useMoveToTrashDialog({
        media: elements as TMedium[],
        callback: actionCallback
    })

    const action = () => {
        if (isMedia(elements)) {
            moveToTrashDialog()
        } else {
            deleteAlbumDialog()
        }

        callback && callback()
    }

    useKeyboard('keyup', 'Backspace', shortcut && action)

    const label = isMedia(elements) ? t(ETrans.DELETE) : t(ETrans.DELETE_THING, {
        thing: t(ETrans.ALBUM)
    })

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
