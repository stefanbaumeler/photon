import * as Icons from '@mdi/js'
import { Dropdown, Button } from '../'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { DeleteControl, SetAlbumCoverControl, ViewControl, SortControl, DownloadMediaControl } from '@/components/controls'
import { useQAlbum } from '@photon/schema'

export const AlbumControls = () => {
    const { t } = useTranslation()
    const router = useRouter()
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
            elements={album ? [album.id] : []}
            key={0}
        />,
        <SetAlbumCoverControl
            dropdown={true}
            shortcut={true}
            callback={() => setMoreActive(false)}
            key={1}
        />,
        <DownloadMediaControl
            dropdown={true}
            shortcut={true}
            callback={() => setMoreActive(false)}
            elements={album ? album.media.map((medium) => medium.id) : []}
            key={2}
        />
    ]

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
