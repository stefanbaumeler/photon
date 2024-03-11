import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { TAlbum, TMedium } from '@photon/schema'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { useSetAlbumCover, useKeyboard } from '@/hooks'
import { ESelectionMode } from '@/types/app'

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

    useKeyboard('keyup', 'c', shortcut && action)

    return dropdown ? <DropdownItem item={{
        testId: 'album-set-cover',
        label: t(ETrans.SET_ALBUM_COVER),
        callback: action,
        shortcut: shortcut && 'C'
    }}
    /> : <Button
        testId="album-set-cover"
        hint={t(ETrans.SET_ALBUM_COVER)}
        shortcut={shortcut && 'C'}
        onClick={action}
        appearance={details.active && {
            text: 'light'
        }}
        icon={Icons.mdiImageAlbum}
    />
}
