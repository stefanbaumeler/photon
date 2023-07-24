import { ETrans } from '@/types/translations'
import { useDialogContext, useSelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import useSetMediaStatus from '../hooks/set-status'
import { EMediumStatus } from '@/types/app'
import { TMedium } from '@photon/schema'

type Props = {
    media: TMedium[] | Set<TMedium> | TMedium
    callback?: () => void
}

export const useMoveToTrashDialog = ({
    media, callback
}: Props) => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const { t } = useTranslation()

    const trash = useSetMediaStatus({
        media,
        status: EMediumStatus.TRASH
    })

    const confirm = async () => {
        await trash()
        dialog.close()
        callback()
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
                onClick: dialog.close,
                appearance: {
                    type: 'secondary'
                }
            },
            {
                testId: 'move-to-trash-confirm',
                label: t(ETrans.MOVE_TO_TRASH),
                onClick: confirm
            }
        ]
    })
}
