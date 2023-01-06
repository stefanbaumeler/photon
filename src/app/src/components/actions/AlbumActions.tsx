import * as Icons from '@mdi/js'
import { IconButton, Dropdown } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import useDeleteAlbumDialog from '@/dialogs/delete-album'
import { useRouter } from 'next/router'
import { useLayoutContext, useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'

export const AlbumActions = () => {
    const { t } = useTranslation()
    const selection = useSelectionContext()
    const layout = useLayoutContext()
    const router = useRouter()

    const deleteAlbumDialog = useDeleteAlbumDialog()

    const setAlbumCover = () => {
        setMoreActive(false)
        selection.setMode(ESelectionMode.SINGLE)
    }

    const layoutProps = layout.getLayoutProps(layout.nextLayout)

    const changeLayout = () => {
        layout.setLayout(layout.nextLayout)
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
            cy: 'album-set-cover'
        }
    ]

    const [moreActive, setMoreActive] = useState(false)

    if (router.pathname !== '/albums/[idAlbum]' || selection.mode !== ESelectionMode.OFF) {
        return <></>
    }

    return <div className="actions">
        <IconButton
            hint={layoutProps.name}
            icon={layoutProps.icon}
            onClick={changeLayout}
        />
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
        >
            <IconButton
                hint={t(ETrans.MORE_OPTIONS)}
                icon={Icons.mdiDotsVertical}
                onClick={() => setMoreActive(!moreActive)}
                cy={'album-more'}
            />
        </Dropdown>
    </div>
}
