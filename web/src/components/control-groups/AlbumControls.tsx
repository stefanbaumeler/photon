import * as Icons from '@mdi/js'
import { Dropdown, Button } from '../'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { MoveToTrashControl, SetAlbumCoverControl, ViewControl, SortControl, DownloadMediaControl } from '@/components/controls'
import { useQAlbum } from '@photon/schema'
import { ETrans } from '@/types/translations'

export const AlbumControls = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const id = Array.isArray(router.query.idAlbum) ? router.query.idAlbum?.join('') : router.query.idAlbum
    const [moreActive, setMoreActive] = useState(false)

    const [{ data }] = useQAlbum({
        variables: {
            id: id ?? ''
        },
        pause: !id
    })

    const moreItems = [
        <MoveToTrashControl
            dropdown
            shortcut
            callback={() => setMoreActive(false)}
            elements={data?.album ? [data?.album.id] : []}
            key={0}
        />,
        <SetAlbumCoverControl
            dropdown
            shortcut
            callback={() => setMoreActive(false)}
            key={1}
        />,
        <DownloadMediaControl
            dropdown
            shortcut
            callback={() => setMoreActive(false)}
            elements={data?.album.media ? data?.album.media?.map((medium) => medium.id) : []}
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
