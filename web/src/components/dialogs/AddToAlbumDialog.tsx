import { ETrans } from '@/types/translations'
import { Dialog, Thumbnails } from '@/components'
import { useTranslation } from 'react-i18next'

type Props = {
    closeCallback: () => void
}

export const AddToAlbumDialog = ({ closeCallback }: Props) => {
    const { t } = useTranslation()

    return <Dialog
        id="add-to-album"
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
