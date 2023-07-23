import { ETrans } from '@/types/translations'
import { useDialogContext, useSelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useSetMediaStatus from '../hooks/set-status'
import { EMediumStatus } from '@/types/app'
import { TMedium } from '@photon/schema'

const useRestoreMediaDialog = (media: TMedium[] | Set<TMedium> | TMedium) => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const { t } = useTranslation()

    console.log(media)

    const restore = useSetMediaStatus({
        media,
        status: EMediumStatus.ALL
    })

    const confirm = () => {
        restore()
        dialog.close()
    }

    return () => dialog.open({
        id: 'delete-media',
        title: t(ETrans.RESTORE),
        text: t(ETrans.RESTORE_THING, {
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
                testId: 'trash-restore-confirm',
                label: t(ETrans.RESTORE),
                onClick: confirm
            }
        ]
    })
}

export default useRestoreMediaDialog
