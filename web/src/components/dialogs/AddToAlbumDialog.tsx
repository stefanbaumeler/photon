import { ETrans } from '@/types/translations'
import { Dialog, Thumbnails } from '@/components'
import { useTranslation } from 'react-i18next'

type Props = {
    closeCallback: () => void
    active: boolean
}

export const AddToAlbumDialog = ({
    closeCallback, active
}: Props) => {
    const { t } = useTranslation()

    return <Dialog
        id="add-to-album"
        title={t(ETrans.ADD_TO)}
        closeCallback={closeCallback}
        active={active}
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
