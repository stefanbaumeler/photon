import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { useSetAlbumCover } from '@/hooks'
import { EKeyboardScope, ESelectionMode } from '@/types/app'
import { useHotkey } from '@/hooks/hotkey'

type Props = {
    album?: string
    medium?: string
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const SetAlbumCoverControl = ({
    album, medium, dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const selection = useSelectionContext()

    const setAlbumCover = useSetAlbumCover(album, medium)

    const action = () => {
        if (medium) {
            setAlbumCover()
            callback && callback()
        }
        else {
            selection.setMode(ESelectionMode.SINGLE)
        }
    }

    useHotkey({
        key: 'c',
        callback: action,
        scopes: EKeyboardScope.album,
        condition: !!shortcut
    })

    return dropdown ? <DropdownItem item={{
        testId: 'album-set-cover',
        label: t(ETrans.SET_ALBUM_COVER),
        callback: action,
        shortcut: shortcut ? 'C' : undefined
    }}
    /> : <Button
        testId="album-set-cover"
        hint={t(ETrans.SET_ALBUM_COVER)}
        shortcut={shortcut ? 'C' : undefined}
        onClick={action}
        appearance={details.active ? {
            text: 'light'
        } : undefined}
        icon={Icons.mdiImageAlbum}
    />
}
