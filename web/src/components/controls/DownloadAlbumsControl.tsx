import * as Icons from '@mdi/js'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EKeyboardScope, EMediumStatus, ESelectionMode } from '@/types/app'
import { useQAlbums } from '@photon/schema/dist/client'
import { useHotkey } from '@/hooks/useHotkey'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useDownload } from '@/hooks/useDownload'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { Button } from '@/components/shared/Button'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

type Props = {
    dropdown?: boolean
    shortcut?: boolean
}

export const DownloadAlbumsControl = ({
    dropdown, shortcut
}: Props) => {
    const { t } = useTranslation()
    const { medium } = useMediumFromRouter()
    const selection = useSelectionContext()
    const [{ data: albums }] = useQAlbums({
        pause: selection.mode !== ESelectionMode.ALBUMS
    })

    const selectedMedia = [...new Set(albums?.albums.filter((album) => {
        return [...selection.selected].includes(album.id)
    }).map((album) => {
        return album.media?.filter((medium) => medium.status === EMediumStatus.ALL).map((medium) => medium.id) ?? []
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
        shortcut: shortcut ? 'D' : undefined
    }}
    /> : <Button
        testId="download"
        hint={t(ETrans.DOWNLOAD)}
        shortcut={shortcut ? 'D' : undefined}
        onClick={download}
        appearance={medium ? {
            text: 'light'
        } : undefined}
        icon={Icons.mdiTrayArrowDown}
    />
}
