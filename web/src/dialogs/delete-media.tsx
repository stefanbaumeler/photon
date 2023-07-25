import { ETrans } from '@/types/translations'
import { useDialogContext, useSelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { useDeleteMedia } from '@/hooks'

export const useDeleteMediaDialog = () => {
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
                onClick: dialog.close,
                appearance: {
                    type: 'secondary'
                }
            },
            {
                testId: 'trash-delete-confirm',
                label: t(ETrans.PERMANENTLY_DELETE),
                onClick: confirm
            }
        ]
    })
}
