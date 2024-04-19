import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { AddToAlbumDialog } from '@/components/dialogs'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDetailsContext } from '@/providers'
import { useState } from 'react'

type Props = {
    dropdown?: boolean
}

export const AddToControl = ({ dropdown }: Props) => {
    const { t } = useTranslation()
    const details = useDetailsContext()
    const [dialogActive, setDialogActive] = useState(false)

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
            appearance={details.active ? {
                text: 'light'
            } : undefined}
            icon={Icons.mdiPlus}
        />}
    </>
}
