import { ETrans } from '@/types/translations'
import { Thumbnails } from '@/components'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { DialogContext } from '@/providers'

const useAddToAlbumDialog = () => {
    const { t } = useTranslation()
    const dialog = useContext(DialogContext)

    return () => dialog.open({
        id: 'add-to-album',
        title: t(ETrans.ADD_TO),
        buttons: [
            {
                label: t(ETrans.CANCEL),
                action: dialog.close,
                type: 'secondary'
            }
        ],
        content: <Thumbnails />
    })
}

export default useAddToAlbumDialog
