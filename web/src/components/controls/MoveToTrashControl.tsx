import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EKeyboardScope, ESelectionMode } from '@/types/app'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useHotkey } from '@/hooks/useHotkey'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { DeleteAlbumDialog } from '@/components/dialogs/DeleteAlbumDialog'
import { MoveToTrashDialog } from '@/components/dialogs/MoveToTrashDialog'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { Button } from '@/components/shared/Button'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'
import { getParentUrl } from '@/util/routing'

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
    const selection = useSelectionContext()
    const pathname = usePathname()
    const { medium } = useMediumFromRouter()
    const router = useRouter()

    const actionCallback = () => {
        if (selection.selected.size) {
            selection.clear()
        }
    }

    const [deleteAlbumDialogActive, setDeleteAlbumDialogActive] = useState(false)
    const [moveToTrashDialogActive, setMoveToTrashDialogActive] = useState(false)

    const action = () => {
        if (selection.mode === ESelectionMode.ALBUMS || pathname === '/albums') {
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
                // await details.close()
                if (medium) {
                    const parent = getParentUrl(pathname)
                    router.push(parent)
                }
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
            appearance={medium ? {
                text: 'light'
            } : undefined}
        />}
    </>
}
