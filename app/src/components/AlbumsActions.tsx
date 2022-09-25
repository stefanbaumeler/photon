import * as Icons from '@mdi/js'
import { IconButton } from '@/components/index'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { NavContext } from '@/providers'
import { ENavItemType } from '@/types/app'
import { useAlbums } from '@/api/hooks'

const AlbumsActions = () => {
    const { t } = useTranslation()

    const nav = useContext(NavContext)

    const item = nav.getActiveItem()

    if (item.type !== ENavItemType.ALBUMS) {
        return <></>
    }

    const { refetch } = useAlbums()

    const add = () => {
        fetch('http://localhost:2000/albums', {
            method: 'post'
        }).then(() => {
            refetch()
        })
    }

    return <div className="bulk-actions">
        <IconButton
            hint={t(ETrans.CREATE_THING, {
                thing: t(ETrans.ALBUM)
            })}
            icon={Icons.mdiPlus}
            onClick={add}
        />
    </div>
}

export default AlbumsActions
