import { ETrans } from '../types/translations'
import { useDialogContext, useSelectionContext } from '../providers'
import { useTranslation } from 'react-i18next'
import useDeleteMedia from '../hooks/delete-media'

const useDeleteMediaDialog = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
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
                testId: 'trash-delete-confirm',
                label: t(ETrans.PERMANENTLY_DELETE),
                action: confirm
            }
        ]
    })
}

export default useDeleteMediaDialog
