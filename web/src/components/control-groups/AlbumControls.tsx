import * as Icons from '@mdi/js'
import { Dropdown } from '@/components/shared/Dropdown'
import { Button } from '@/components/shared/Button'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { MoveToTrashControl } from '@/components/controls/MoveToTrashControl'
import { SetAlbumCoverControl } from '@/components/controls/SetAlbumCoverControl'
import { ViewControl } from '@/components/controls/ViewControl'
import { SortControl } from '@/components/controls/SortControl'
import { DownloadMediaControl } from '@/components/controls/DownloadMediaControl'
import { useQAlbum } from '@photon/schema/dist/client'
import { ETrans } from '@/types/translations'

export const AlbumControls = () => {
    const { t } = useTranslation()
    const params = useParams()

    const id = Array.isArray(params.idAlbum) ? params.idAlbum[0] : params.idAlbum
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
