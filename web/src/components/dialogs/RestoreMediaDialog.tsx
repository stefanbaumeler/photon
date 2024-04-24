import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { EMediumStatus } from '@/types/app'
import { asArray } from '@/util/as'
import { useSetMediaStatus } from '@/hooks/set-status'
import { Dialog } from '@/components/shared/Dialog'

type Props = {
    media: string[]
    closeCallback: (actionTaken: boolean) => void
}

export const RestoreMediaDialog = ({
    media, closeCallback
}: Props) => {
    const { t } = useTranslation()
    const restore = useSetMediaStatus({
        media,
        status: EMediumStatus.ALL
    })

    const submit = () => {
        restore()
        closeCallback(true)
    }

    return <Dialog
        closeCallback={() => closeCallback(false)}
        title={t(ETrans.RESTORE)}
        text={t(ETrans.RESTORE_THING, {
            count: asArray(media).length || 1,
            thing: t(ETrans.ELEMENT_COUNT, {
                count: asArray(media).length || 1
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
                label: t(ETrans.RESTORE),
                onClick: submit
            }
        ]}
    />
}
