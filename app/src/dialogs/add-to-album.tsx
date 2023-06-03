import { ETrans } from '@/types/translations'
import { Thumbnails } from '@/components'
import { useTranslation } from 'react-i18next'
import { useDialogContext } from '@/providers'

const useAddToAlbumDialog = () => {
    const { t } = useTranslation()
    const dialog = useDialogContext()

    return () => dialog.open({
        id: 'add-to-album',
        title: t(ETrans.ADD_TO),
        buttons: [
            {
                label: t(ETrans.CANCEL),
                onClick: dialog.close,
                appearance: {
                    type: 'secondary'
                }
            }
        ],
        content: <Thumbnails />
    })
}

export default useAddToAlbumDialog
