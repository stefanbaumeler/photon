import * as Icons from '@mdi/js'
import { Button, AlbumsViewControl } from '../'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import useCreateAlbum from '../../hooks/create-album'
import { useRouter } from 'next/router'
import { useKeyboard } from '@/hooks/keyboard'

export const AlbumsActions = () => {
    const { t } = useTranslation()
    const selection = useSelectionContext()
    const router = useRouter()
    const isAlbumsPage = router.pathname === '/albums'

    const createAlbum = useCreateAlbum()

    useKeyboard('keyup', 'c', isAlbumsPage ? createAlbum : undefined)

    if (router.pathname !== '/albums' || selection.mode !== ESelectionMode.OFF) {
        return <></>
    }

    return <div className="actions">
        <AlbumsViewControl />
        <Button
            testId="album-create"
            hint={t(ETrans.CREATE_THING, {
                thing: t(ETrans.ALBUM)
            })}
            shortcut={'C'}
            icon={Icons.mdiPlus}
            onClick={createAlbum}
        />
    </div>
}
