import * as Icons from '@mdi/js'
import { Dropdown, ViewControl, Button, SortControl } from '../'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import useDeleteAlbumDialog from '../../dialogs/delete-album'
import { useRouter } from 'next/router'
import { useSearchContext, useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import useDownload from '@/hooks/download'

export const AlbumActions = () => {
    const { t } = useTranslation()
    const selection = useSelectionContext()
    const router = useRouter()
    const { hits: media } = useSearchContext()

    const deleteAlbumDialog = useDeleteAlbumDialog()

    const download = useDownload(media.map(({ id }) => id))

    const setAlbumCover = () => {
        setMoreActive(false)
        selection.setMode(ESelectionMode.SINGLE)
    }

    const moreItems = [
        {
            label: t(ETrans.DELETE_THING, {
                thing: t(ETrans.ALBUM)
            }),
            callback: deleteAlbumDialog
        },
        {
            label: t(ETrans.SET_ALBUM_COVER),
            callback: setAlbumCover,
            testId: 'album-set-cover'
        },
        {
            label: t(ETrans.DOWNLOAD_THING, {
                thing: t(ETrans.ALBUM)
            }),
            callback: download
        }
    ]

    const [moreActive, setMoreActive] = useState(false)

    if (router.pathname !== '/albums/[idAlbum]' || selection.mode !== ESelectionMode.OFF) {
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
