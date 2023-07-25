import { ETrans } from '@/types/translations'
import { useDialogContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { useDeleteAlbum } from '@/hooks'
import { asArray } from '@/util/as'

type Props = {
    id?: string | string[]
    callback?: () => void
}
export const useDeleteAlbumDialog = ({
    id, callback
}: Props) => {
    const dialog = useDialogContext()
    const { t } = useTranslation()

    const deleteAlbum = useDeleteAlbum({
        id,
        callback
    })

    const confirm = async () => {
        await deleteAlbum()

        dialog.close()
        callback()
    }

    return () => dialog.open({
        id: 'delete-album',
        title: t(ETrans.PERMANENTLY_DELETE),
        text: t(ETrans.PERMANENTLY_DELETE_THING, {
            count: asArray(id).length || 1,
            thing: t(ETrans.ALBUM_COUNT, {
                count: asArray(id).length || 1
            })
        }),
        buttons: [
            {
                label: t(ETrans.CANCEL),
                onClick: dialog.close,
                appearance: {
                    type: 'secondary'
                }
            },
            {
                testId: 'album-confirm-delete',
                label: t(ETrans.PERMANENTLY_DELETE),
                onClick: confirm
            }
        ]
    })
}
