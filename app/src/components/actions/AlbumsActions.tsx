import * as Icons from '@mdi/js'
import { IconButton, AlbumsViewControl } from '..'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import useCreateAlbum from '../../hooks/create-album'
import { useRouter } from 'next/router'

export const AlbumsActions = () => {
    const { t } = useTranslation()
    const selection = useSelectionContext()
    const router = useRouter()

    const createAlbum = useCreateAlbum()

    if (router.pathname !== '/albums' || selection.mode !== ESelectionMode.OFF) {
        return <></>
    }

    return <div className="actions">
        <AlbumsViewControl />
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
