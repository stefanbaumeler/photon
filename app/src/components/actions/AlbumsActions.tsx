import * as Icons from '@mdi/js'
import { IconButton } from '../'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useNavContext } from '@/providers'
import { ENavItemType } from '@/types/app'
import useCreateAlbum from '../../hooks/create-album'

export const AlbumsActions = () => {
    const { t } = useTranslation()

    const nav = useNavContext()

    const item = nav.getActiveItem()

    if (item.type !== ENavItemType.ALBUMS) {
        return <></>
    }

    const createAlbum = useCreateAlbum()

    return <div className="actions">
        <IconButton
            testId="album-create"
            hint={t(ETrans.CREATE_THING, {
                thing: t(ETrans.ALBUM)
            })}
            icon={Icons.mdiPlus}
            onClick={createAlbum}
        />
    </div>
}
