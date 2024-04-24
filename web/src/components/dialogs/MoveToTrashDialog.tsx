import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EMediumStatus } from '@/types/app'
import { useSetMediaStatus } from '@/hooks/set-status'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useSearchContext } from '@/providers/SearchProvider'
import { Dialog } from '@/components/shared/Dialog'

type Props = {
    media: string[]
    callback?: () => void
    closeCallback: () => void
}

export const MoveToTrashDialog = ({
    closeCallback, callback, media
}: Props) => {
    const selection = useSelectionContext()
    const search = useSearchContext()
    const { t } = useTranslation()

    const trash = useSetMediaStatus({
        media,
        status: EMediumStatus.TRASH
    })

    const confirm = async () => {
        await trash()
        search.refresh()
        closeCallback()
        callback && callback()
    }

    return <Dialog
        closeCallback={closeCallback}
        title={t(ETrans.MOVE_TO_TRASH)}
        text={t(ETrans.MOVE_ITEMS_TO_TRASH, {
            count: selection.selected.size || 1,
            thing: t(ETrans.ELEMENT, {
                count: selection.selected.size || 1
            })
        })}
        buttons={[
            {
                label: t(ETrans.CANCEL),
                onClick: closeCallback,
                appearance: {
                    type: 'secondary'
                }
            },
            {
                testId: 'confirm',
                label: t(ETrans.MOVE_TO_TRASH),
                onClick: confirm
            }
        ]}
    />
}
