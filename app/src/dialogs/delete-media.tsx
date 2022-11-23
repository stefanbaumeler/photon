import { ETrans } from '@/types/translations'
import { useContext } from 'react'
import { DialogContext, SelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useDeleteMedia from '@/hooks/delete-media'

const useDeleteMediaDialog = () => {
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const { t } = useTranslation()

    const confirm = useDeleteMedia()

    return () => dialog.open({
        id: 'delete-media',
        title: t(ETrans.PERMANENTLY_DELETE),
        text: t(ETrans.PERMANENTLY_DELETE_THING, {
            count: selection.selected.size || 1,
            thing: t(ETrans.ELEMENT_COUNT, {
                count: selection.selected.size || 1
            })
        }),
        buttons: [
            {
                label: t(ETrans.CANCEL),
                action: dialog.close,
                type: 'secondary'
            },
            {
                label: t(ETrans.MOVE_TO_TRASH),
                action: confirm,
                cy: 'trash-delete-confirm'
            }
        ]
    })
}

export default useDeleteMediaDialog
