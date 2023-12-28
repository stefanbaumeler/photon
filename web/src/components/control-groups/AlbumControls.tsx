import * as Icons from '@mdi/js'
import { Dropdown, Button } from '../'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import { DeleteControl, DownloadControl, SetAlbumCoverControl, ViewControl, SortControl } from '@/components/controls'
import { useQAlbum } from '@photon/schema'

export const AlbumControls = () => {
    const { t } = useTranslation()
    const selection = useSelectionContext()
    const router = useRouter()
    const inactive = router.pathname !== '/albums/[idAlbum]' || selection.mode !== ESelectionMode.OFF
    const id = Array.isArray(router.query.idAlbum) ? router.query.idAlbum.join('') : router.query.idAlbum
    const [moreActive, setMoreActive] = useState(false)

    const [albumQuery] = useQAlbum({
        variables: {
            id
        },
        pause: !id
    })

    const album = albumQuery.data?.album

    const moreItems = [
        <DeleteControl
            dropdown={true}
            shortcut={true}
            callback={() => setMoreActive(false)}
            elements={album ? [album] : []}
            key={0}
        />,
        <SetAlbumCoverControl
            dropdown={true}
            shortcut={true}
            callback={() => setMoreActive(false)}
            album={album}
            key={1}
        />,
        <DownloadControl
            dropdown={true}
            shortcut={true}
            callback={() => setMoreActive(false)}
            elements={album ? [album] : []}
            key={2}
        />
    ]

    if (inactive) {
        return <></>
    }

    return <div className="actions">
        <ViewControl />
        <SortControl />
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
        >
            <Button
                hint={t(ETrans.MORE_OPTIONS)}
                icon={Icons.mdiDotsVertical}
                onClick={() => setMoreActive(!moreActive)}
                testId="album-more"
            />
        </Dropdown>
    </div>
}
