import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useEmptyTrash } from '@/hooks'
import { Dialog } from '@/components'

type Props = {
    closeCallback: () => void
    active: boolean
}

export const EmptyTrashDialog = ({
    closeCallback, active
}: Props) => {
    const emptyTrash = useEmptyTrash()
    const { t } = useTranslation()

    const confirm = async () => {
        await emptyTrash()
        closeCallback()
    }

    return <Dialog
        id="delete-media"
        closeCallback={closeCallback}
        active={active}
        title={`${t(ETrans.EMPTY_TRASH)}?`}
        text={t(ETrans.PERMANENTLY_DELETE_THING, {
            thing: t(ETrans.ALL_ELEMENTS)
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
                testId: 'trash-empty-confirm',
                label: t(ETrans.PERMANENTLY_DELETE),
                onClick: confirm
            }
        ]}
    />
}
