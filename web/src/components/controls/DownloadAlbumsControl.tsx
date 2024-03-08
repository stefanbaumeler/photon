import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDownload, useKeyboard } from '@/hooks'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { EMediumStatus, ESelectionMode } from '@/types/app'
import { useQAlbums } from '@photon/schema'

type Props = {
    dropdown?: boolean
    shortcut?: boolean
    callback?: () => void
}

export const DownloadAlbumsControl = ({
    dropdown, shortcut, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const [{ data: albums }] = useQAlbums({
        pause: selection.mode !== ESelectionMode.ALBUMS
    })

    console.log(albums)

    const selectedMedia = [...new Set(albums?.albums.filter((album) => {
        return [...selection.selected].includes(album.id)
    }).map((album) => {
        return album.media.filter((medium) => medium.status === EMediumStatus.ALL).map((medium) => medium.id)
    }).flat())]

    const actionCallback = () => {
        if (selection.selected.size) {
            selection.clear()
        }
    }

    const download = useDownload({
        elements: selectedMedia,
        callback: actionCallback
    })

    const action = () => {
        download()

        callback && callback()
    }

    useKeyboard('keyup', 'd', shortcut && action)

    if (dropdown) {
        return <DropdownItem item={{
            testId: 'download',
            label: t(ETrans.DOWNLOAD),
            callback: action,
            shortcut: shortcut && 'D'
        }}
        />
    }

    return <Button
        testId="download"
        hint={t(ETrans.DOWNLOAD)}
        shortcut={shortcut && 'D'}
        onClick={action}
        appearance={details.active && {
            text: 'light'
        }}
        icon={Icons.mdiTrayArrowDown}
    />
}
