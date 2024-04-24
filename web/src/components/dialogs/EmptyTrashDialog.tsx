import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { Dialog } from '@/components/shared/Dialog'
import { useEmptyTrash } from '@/hooks/useEmptyTrash'

type Props = {
    closeCallback: () => void
}

export const EmptyTrashDialog = ({ closeCallback }: Props) => {
    const emptyTrash = useEmptyTrash()
    const { t } = useTranslation()

    const confirm = async () => {
        await emptyTrash()
        closeCallback()
    }

    return <Dialog
        closeCallback={closeCallback}
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
                testId: 'confirm',
                label: t(ETrans.PERMANENTLY_DELETE),
                onClick: confirm
            }
        ]}
    />
}
