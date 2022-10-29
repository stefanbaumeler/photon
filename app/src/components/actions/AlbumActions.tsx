import * as Icons from '@mdi/js'
import { IconButton, Dropdown } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useContext, useState } from 'react'
import useDeleteAlbumDialog from '@/dialogs/delete-album'
import { useRouter } from 'next/router'
import { SelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'

const AlbumsActions = () => {
    const { t } = useTranslation()
    const selection = useContext(SelectionContext)

    const router = useRouter()

    const deleteAlbumDialog = useDeleteAlbumDialog()

    const moreItems = [
        {
            label: t(ETrans.DELETE_THING, {
                thing: t(ETrans.ALBUM)
            }),
            callback: deleteAlbumDialog
        }
    ]

    const [moreActive, setMoreActive] = useState(false)

    if (router.pathname !== '/albums/[id]' || selection.mode !== ESelectionMode.OFF) {
        return <></>
    }

    return <div className="actions">
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
        >
            <IconButton
                hint={t(ETrans.MORE_OPTIONS)}
                icon={Icons.mdiDotsVertical}
                onClick={() => setMoreActive(!moreActive)}
            />
        </Dropdown>
    </div>
}

export default AlbumsActions
