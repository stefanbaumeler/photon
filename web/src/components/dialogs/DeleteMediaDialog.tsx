import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useMDeleteMedia } from '@photon/schema/dist/client'
import { Dialog } from '@/components/shared/Dialog'
import { useSelectionContext } from '@/providers/SelectionProvider'

type Props = {
    media: string[]
    closeCallback: (actionTaken: boolean) => void
}

export const DeleteMediaDialog = ({
    media, closeCallback
}: Props) => {
    const { t } = useTranslation()
    const selection = useSelectionContext()
    const [, deleteMedia] = useMDeleteMedia()

    return <Dialog
        closeCallback={() => closeCallback(false)}
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
                onClick: () => closeCallback(false),
                appearance: {
                    type: 'secondary'
                }
            },
            {
                testId: 'confirm',
                label: t(ETrans.PERMANENTLY_DELETE),
                onClick: () => {
                    deleteMedia({
                        ids: media
                    })
                    closeCallback(true)
                }
            }
        ]}
    />
}
