import { Button } from '../'
import { ETrans } from '@/types/translations'
import * as Icons from '@mdi/js'
import { useDeleteMediaDialog, useRestoreMediaDialog } from '@/dialogs'
import { useDetailsContext, useSelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'

type Props = {
    white?: boolean
}

export const TrashControls = ({ white }: Props) => {
    const selection = useSelectionContext()
    const { t } = useTranslation()
    const details = useDetailsContext()

    const deleteMediaDialog = useDeleteMediaDialog()
    const restoreMediaDialog = useRestoreMediaDialog(details.active ? [details.medium.id] : [...selection.selected])

    return <>
        <Button
            label={t(ETrans.DELETE)}
            onClick={deleteMediaDialog}
            icon={Icons.mdiDeleteForever}
            testId="trash-delete"
            appearance={{
                type: 'tertiary',
                text: white ? 'light' : undefined
            }}
        />
        <Button
            label={t(ETrans.RESTORE)}
            onClick={restoreMediaDialog}
            icon={Icons.mdiDeleteRestore}
            testId="trash-restore"
            appearance={{
                type: 'tertiary',
                text: white ? 'light' : undefined
            }}
        />
    </>
}
