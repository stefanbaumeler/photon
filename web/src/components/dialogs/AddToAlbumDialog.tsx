import { ETrans } from '@/types/translations'
import { Dialog } from '@/components/shared/Dialog'
import { Thumbnails } from '@/components/shared/Thumbnails'
import { useTranslation } from 'react-i18next'

type Props = {
    closeCallback: () => void
}

export const AddToAlbumDialog = ({ closeCallback }: Props) => {
    const { t } = useTranslation()

    return <Dialog
        title={t(ETrans.ADD_TO)}
        closeCallback={closeCallback}
        buttons={[
            {
                label: t(ETrans.CANCEL),
                onClick: closeCallback,
                appearance: {
                    type: 'secondary'
                }
            }
        ]}
    >
        <Thumbnails />
    </Dialog>
}
