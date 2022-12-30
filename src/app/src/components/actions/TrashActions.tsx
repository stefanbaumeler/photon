import { IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import * as Icons from '@mdi/js'
import useDeleteMediaDialog from '@/dialogs/delete-media'
import useRestoreMediaDialog from '@/dialogs/restore-media'
import { useContext } from 'react'
import { SelectionContext } from '@/providers'
import { useTranslation } from 'react-i18next'

type Props = {
    white?: boolean
}
const TrashActions = ({ white }: Props) => {
    const selection = useContext(SelectionContext)
    const { t } = useTranslation()

    const deleteMediaDialog = useDeleteMediaDialog()
    const restoreMediaDialog = useRestoreMediaDialog(selection.selected)

    return <>
        <IconButton
            label={t(ETrans.DELETE)}
            onClick={deleteMediaDialog}
            icon={Icons.mdiDeleteForever}
            cy={'trash-delete'}
            white={white}
        />
        <IconButton
            label={t(ETrans.RESTORE)}
            onClick={restoreMediaDialog}
            icon={Icons.mdiDeleteRestore}
            cy={'trash-restore'}
            white={white}
        />
    </>
}

export default TrashActions
