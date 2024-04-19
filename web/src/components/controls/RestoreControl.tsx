import * as Icons from '@mdi/js'
import { Button, DropdownItem } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { useState } from 'react'
import { RestoreMediaDialog } from '@/components/dialogs'

type Props = {
    dropdown?: boolean
    callback?: () => void
    media: string[]
}

export const RestoreControl = ({
    dropdown, media, callback
}: Props) => {
    const selection = useSelectionContext()
    const [dialogActive, setDialogActive] = useState(false)

    const { t } = useTranslation()
    const details = useDetailsContext()

    const action = () => {
        setDialogActive(false)
        details.close()
        selection.clear()
        callback && callback()
    }

    return <>
        {dialogActive ? <RestoreMediaDialog
            media={media}
            closeCallback={action}
        /> : null}
        {dropdown ? <DropdownItem item={{
            testId: 'trash-restore',
            label: t(ETrans.RESTORE),
            callback: () => {
                setDialogActive(true)
                callback && callback()
            }
        }}
        /> : <Button
            label={t(ETrans.RESTORE)}
            onClick={() => {
                setDialogActive(true)
                callback && callback()
            }}
            icon={Icons.mdiDeleteRestore}
            testId="trash-restore"
            appearance={{
                type: 'tertiary',
                text: details.active ? 'light' : undefined
            }}
        />}
    </>
}
