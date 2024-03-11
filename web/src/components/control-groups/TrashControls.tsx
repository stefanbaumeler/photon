import { Button } from '../'
import { ETrans } from '@/types/translations'
import * as Icons from '@mdi/js'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { RestoreMediaDialog, DeleteMediaDialog } from '@/components/dialogs'
import { useState } from 'react'

type Props = {
    white?: boolean
}

export const TrashControls = ({ white }: Props) => {
    const selection = useSelectionContext()
    const { t } = useTranslation()
    const details = useDetailsContext()

    const [restoreMediaDialogActive, setRestoreMediaDialogActive] = useState(false)
    const [deleteMediaDialogActive, setDeleteMediaDialogActive] = useState(false)

    return <>
        <RestoreMediaDialog
            active={restoreMediaDialogActive}
            media={details.active ? [details.medium.id] : [...selection.selected]}
            closeCallback={() => setRestoreMediaDialogActive(false)}
        />
        <DeleteMediaDialog
            closeCallback={() => setDeleteMediaDialogActive(false)}
            active={deleteMediaDialogActive}
        />
        <Button
            label={t(ETrans.DELETE)}
            onClick={() => setDeleteMediaDialogActive(true)}
            icon={Icons.mdiDeleteForever}
            testId="trash-delete"
            appearance={{
                type: 'tertiary',
                text: white ? 'light' : undefined
            }}
        />
        <Button
            label={t(ETrans.RESTORE)}
            onClick={() => setRestoreMediaDialogActive(true)}
            icon={Icons.mdiDeleteRestore}
            testId="trash-restore"
            appearance={{
                type: 'tertiary',
                text: white ? 'light' : undefined
            }}
        />
    </>
}
