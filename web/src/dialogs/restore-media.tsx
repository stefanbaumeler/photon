import { ETrans } from '@/types/translations'
import { useDialogContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useSetMediaStatus from '../hooks/set-status'
import { EMediumStatus } from '@/types/app'
import { TMedium } from '@photon/schema'
import { asArray } from '@/util/as'

export const useRestoreMediaDialog = (media: TMedium[] | Set<TMedium> | TMedium) => {
    const dialog = useDialogContext()
    const { t } = useTranslation()

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
            count: asArray(media).length || 1,
            thing: t(ETrans.ELEMENT_COUNT, {
                count: asArray(media).length || 1
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
