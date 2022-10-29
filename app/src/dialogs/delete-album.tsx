import { ETrans } from '@/types/translations'
import { useContext } from 'react'
import { DialogContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useDeleteAlbum from '@/hooks/delete-album'

const useDeleteAlbumDialog = (id?: string) => {
    const dialog = useContext(DialogContext)
    const { t } = useTranslation()

    const confirm = useDeleteAlbum(id)

    return () => dialog.open({
        id: 'delete-album',
        title: t(ETrans.PERMANENTLY_DELETE),
        text: t(ETrans.PERMANENTLY_DELETE_THING, {
            thing: t(ETrans.ALBUM)
        }),
        buttons: [
            {
                label: t(ETrans.CANCEL),
                action: dialog.close,
                type: 'secondary'
            },
            {
                label: t(ETrans.PERMANENTLY_DELETE),
                action: confirm
            }
        ]
    })
}

export default useDeleteAlbumDialog
