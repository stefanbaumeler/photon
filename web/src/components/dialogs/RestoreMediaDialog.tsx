import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useSetMediaStatus } from '@/hooks'
import { EMediumStatus } from '@/types/app'
import { asArray } from '@/util/as'
import { Dialog } from '@/components'

type Props = {
    media: string[]
    closeCallback: () => void
    active: boolean
}

export const RestoreMediaDialog = ({
    media, closeCallback, active
}: Props) => {
    const { t } = useTranslation()
    const restore = useSetMediaStatus({
        media,
        status: EMediumStatus.ALL
    })

    const submit = () => {
        restore()
        closeCallback()
    }

    return <Dialog
        id={'delete-media'}
        active={active}
        closeCallback={closeCallback}
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
                onClick: closeCallback,
                appearance: {
                    type: 'secondary'
                }
            },
            {
                testId: 'trash-restore-confirm',
                label: t(ETrans.RESTORE),
                onClick: submit
            }
        ]}
    />
}
