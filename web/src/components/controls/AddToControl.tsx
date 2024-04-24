import * as Icons from '@mdi/js'
import { DropdownItem } from '@/components/shared/Dropdown/components/DropdownItem'
import { Button } from '@/components/shared/Button'
import { AddToAlbumDialog } from '@/components/dialogs/AddToAlbumDialog'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

type Props = {
    dropdown?: boolean
}

export const AddToControl = ({ dropdown }: Props) => {
    const { t } = useTranslation()
    const [dialogActive, setDialogActive] = useState(false)
    const { medium } = useMediumFromRouter()

    const action = () => {
        setDialogActive(true)
    }

    return <>
        {dialogActive ? <AddToAlbumDialog
            closeCallback={() => setDialogActive(false)}
        /> : null}
        {dropdown ? <DropdownItem item={{
            testId: 'add-to',
            label: t(ETrans.ADD_TO),
            callback: action
        }}
        /> : <Button
            testId="add-to"
            hint={t(ETrans.ADD_TO)}
            onClick={action}
            appearance={medium ? {
                text: 'light'
            } : undefined}
            icon={Icons.mdiPlus}
        />}
    </>
}
