import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { asArray } from '@/util/as'
import { Dialog } from '@/components/shared/Dialog'
import { useDeleteAlbum } from '@/hooks/delete-album'

type Props = {
    id?: string | string[]
    closeCallback: () => void
    callback: () => void
}

export const DeleteAlbumDialog = ({
    closeCallback, callback, id
}: Props) => {
    const { t } = useTranslation()

    const deleteAlbum = useDeleteAlbum({
        id,
        callback
    })

    const confirm = async () => {
        await deleteAlbum()

        closeCallback()
        callback()
    }

    return <Dialog
        title={t(ETrans.PERMANENTLY_DELETE)}
        text={t(ETrans.PERMANENTLY_DELETE_THING, {
            count: asArray(id).length || 1,
            thing: t(ETrans.ALBUM_COUNT, {
                count: asArray(id).length || 1
            })
        })}
        closeCallback={closeCallback}
        buttons={[
            {
                label: t(ETrans.CANCEL),
                onClick: closeCallback,
                appearance: {
                    type: 'secondary'
                }
            },
            {
                testId: 'confirm',
                label: t(ETrans.PERMANENTLY_DELETE),
                onClick: confirm
            }
        ]}
    />
}
