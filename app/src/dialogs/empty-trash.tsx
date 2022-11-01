import { ETrans } from '@/types/translations'
import { useContext } from 'react'
import { DialogContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useEmptyTrash from '@/hooks/empty-trash'

const useEmptyTrashDialog = () => {
    const dialog = useContext(DialogContext)
    const { t } = useTranslation()

    const emptyTrash = useEmptyTrash()

    const confirm = () => {
        emptyTrash()
        dialog.close()
    }

    return () => dialog.open({
        id: 'delete-media',
        title: `${t(ETrans.EMPTY_TRASH)}?`,
        text: t(ETrans.PERMANENTLY_DELETE_THING, {
            thing: t(ETrans.ALL_ELEMENTS)
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

export default useEmptyTrashDialog
