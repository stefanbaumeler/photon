import * as Icons from '@mdi/js'
import { IconButton } from '@/components/index'
import { useContext } from 'react'
import { DialogContext, SelectionContext } from '@/providers'
import { useDeleteMedia } from '@/types/api'
import { useMedia } from '@/api/hooks'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'

const BulkActions = () => {
    const { t } = useTranslation()

    const {
        openDialog, closeDialog
    } = useContext(DialogContext)

    const {
        selected, isInSelectionMode
    } = useContext(SelectionContext)

    const [deleteMedia] = useDeleteMedia({
        variables: {
            ids: Array.from(selected).map((item) => item.id)
        }
    })

    const { refetch } = useMedia()

    const openAskDeleteDialog = () => {
        openDialog(`Remove ${selected.size} from Picchu and all synced devices?`, [
            {
                label: t(ETrans.CANCEL),
                action: closeDialog,
                type: 'secondary'
            },
            {
                label: t(ETrans.MOVE_TO_TRASH),
                action: confirmDeleteMedia
            }
        ])
    }

    const confirmDeleteMedia = () => {
        deleteMedia().then(() => {
            refetch().then(() => {
                closeDialog()
            })
        })
    }

    const download = () => {

    }

    if (!isInSelectionMode) {
        return <></>
    }

    return <div className="bulk-actions">
        <IconButton
            hint={t(ETrans.ADD_TO)}
            icon={Icons.mdiPlus}
        />
        <IconButton
            hint={t(ETrans.DOWNLOAD)}
            onClick={download}
            external={true}
            icon={Icons.mdiTrayArrowDown}
        />
        <IconButton
            hint={t(ETrans.DELETE)}
            onClick={openAskDeleteDialog}
            icon={Icons.mdiTrashCanOutline}
        />
    </div>
}

export default BulkActions
