import { ETrans } from '@/types/translations'
import { useDialogContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useEmptyTrash from '../hooks/empty-trash'

const useEmptyTrashDialog = () => {
    const dialog = useDialogContext()
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
                onClick: dialog.close,
                appearance: {
                    type: 'secondary'
                }
            },
            {
                testId: 'trash-empty-confirm',
                label: t(ETrans.PERMANENTLY_DELETE),
                onClick: confirm
            }
        ]
    })
}

export default useEmptyTrashDialog
