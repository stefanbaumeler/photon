import { ETrans } from '@/types/translations'
import { useSelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { useDeleteMedia } from '@/hooks'
import { Dialog } from '@/components'

type Props = {
    closeCallback: () => void
}

export const DeleteMediaDialog = ({ closeCallback }: Props) => {
    const { t } = useTranslation()
    const selection = useSelectionContext()
    const confirm = useDeleteMedia()

    return <Dialog
        closeCallback={closeCallback}
        title={t(ETrans.PERMANENTLY_DELETE)}
        text={t(ETrans.PERMANENTLY_DELETE_THING, {
            count: selection.selected.size || 1,
            thing: t(ETrans.ELEMENT_COUNT, {
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
                label: t(ETrans.PERMANENTLY_DELETE),
                onClick: confirm
            }
        ]}
    />
}
