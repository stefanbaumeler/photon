import { ETrans } from '@/types/translations'
import { useSearchContext, useSelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { useSetMediaStatus } from '@/hooks'
import { EMediumStatus } from '@/types/app'
import { Dialog } from '@/components'

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
