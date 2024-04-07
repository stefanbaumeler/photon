import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { EmptyTrashDialog } from '@/components/dialogs'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

type Props = {
    dropdown?: boolean
    callback?: () => void
}

export const EmptyTrashControl = ({
    dropdown, callback
}: Props) => {
    const { t } = useTranslation()

    const [dialogActive, setDialogActive] = useState(false)

    const action = () => {
        setDialogActive(true)
        callback && callback()
    }

    return <>
        {dialogActive ? <EmptyTrashDialog
            closeCallback={() => setDialogActive(false)}
        /> : null}
        {dropdown ? <DropdownItem item={{
            testId: 'trash-empty',
            label: t(ETrans.EMPTY_TRASH),
            callback: action
        }}
        /> : <Button
            label={t(ETrans.EMPTY_TRASH)}
            icon={Icons.mdiDeleteForever}
            onClick={action}
            testId="trash-empty"
            appearance={{
                type: 'tertiary'
            }}
        />}
    </>
}
