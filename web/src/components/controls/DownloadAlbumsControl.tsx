import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDownload } from '@/hooks'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { EKeyboardScope, EMediumStatus, ESelectionMode } from '@/types/app'
import { useQAlbums } from '@photon/schema'
import { useHotkey } from '@/hooks/hotkey'

type Props = {
    dropdown?: boolean
    shortcut?: boolean
}

export const DownloadAlbumsControl = ({
    dropdown, shortcut
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const selection = useSelectionContext()
    const [{ data: albums }] = useQAlbums({
        pause: selection.mode !== ESelectionMode.ALBUMS
    })

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

    useHotkey({
        key: 'd',
        callback: download,
        scopes: EKeyboardScope.select,
        condition: !!shortcut
    })

    return dropdown ? <DropdownItem item={{
        testId: 'download',
        label: t(ETrans.DOWNLOAD),
        callback: download,
        shortcut: shortcut && 'D'
    }}
    /> : <Button
        testId="download"
        hint={t(ETrans.DOWNLOAD)}
        shortcut={shortcut && 'D'}
        onClick={download}
        appearance={details.active && {
            text: 'light'
        }}
        icon={Icons.mdiTrayArrowDown}
    />
}
