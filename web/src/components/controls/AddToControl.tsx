import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDetailsContext } from '@/providers'
import { useAddToAlbumDialog } from '@/dialogs'

type Props = {
    dropdown?: boolean
    callback?: () => void
}

export const AddToControl = ({
    dropdown, callback
}: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()

    const addToAlbumDialog = useAddToAlbumDialog()

    const action = () => {
        addToAlbumDialog()
        callback && callback()
    }

    if (dropdown) {
        return <DropdownItem item={{
            testId: 'add-to',
            label: t(ETrans.ADD_TO),
            callback: action
        }}
        />
    }

    return <Button
        testId="add-to"
        hint={t(ETrans.ADD_TO)}
        onClick={action}
        appearance={details.active && {
            text: 'light'
        }}
        icon={Icons.mdiPlus}
    />
}
