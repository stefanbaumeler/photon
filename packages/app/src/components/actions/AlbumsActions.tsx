import * as Icons from '@mdi/js'
import { IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { NavContext } from '@/providers'
import { ENavItemType } from '@/types/app'
import useCreateAlbum from '@/hooks/create-album'

export const AlbumsActions = () => {
    const { t } = useTranslation()

    const nav = useContext(NavContext)

    const item = nav.getActiveItem()

    if (item.type !== ENavItemType.ALBUMS) {
        return <></>
    }

    const createAlbum = useCreateAlbum()

    return <div className="actions">
        <IconButton
            hint={t(ETrans.CREATE_THING, {
                thing: t(ETrans.ALBUM)
            })}
            icon={Icons.mdiPlus}
            onClick={createAlbum}
        />
    </div>
}
