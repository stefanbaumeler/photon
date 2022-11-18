import { ETrans } from '@/types/translations'
import { useContext } from 'react'
import { DialogContext, SelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useSetMediaStatus from '@/hooks/set-status'
import { EMediumStatus } from '@/types/app'
import { TMedium } from '@/types/api'

const useRestoreMediaDialog = (idMedia: TMedium[] | Set<TMedium> | TMedium) => {
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const { t } = useTranslation()

    const restore = useSetMediaStatus(idMedia, EMediumStatus.DEFAULT)

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
                action: dialog.close,
                type: 'secondary'
            },
            {
                label: t(ETrans.RESTORE),
                action: confirm
            }
        ]
    })
}

export default useRestoreMediaDialog
