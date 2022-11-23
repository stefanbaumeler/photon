import { ETrans } from '@/types/translations'
import { useContext } from 'react'
import { DialogContext, SelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useSetMediaStatus from '@/hooks/set-status'
import { EMediumStatus } from '@/types/app'
import { TMedium } from '@photon/shared'

const useMoveToTrashDialog = (idMedia: TMedium[] | Set<TMedium> | TMedium) => {
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const { t } = useTranslation()

    const trash = useSetMediaStatus(idMedia, EMediumStatus.TRASH)

    const confirm = () => {
        trash()
        dialog.close()
    }

    return () => dialog.open({
        id: 'delete-media',
        title: t(ETrans.MOVE_TO_TRASH),
        text: t(ETrans.MOVE_ITEMS_TO_TRASH, {
            count: selection.selected.size || 1,
            thing: t(ETrans.ELEMENT, {
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
                action: confirm
            }
        ]
    })
}

export default useMoveToTrashDialog
