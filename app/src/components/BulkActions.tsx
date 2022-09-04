import * as Icons from '@mdi/js'
import { IconButton } from '@/components/index'
import { useContext } from 'react'
import { DialogContext, SelectionContext } from '@/providers'
import { useDeleteMedia } from '@/types/api'
import { useMedia } from '@/api/hooks'

const Brand = () => {
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
                label: 'Cancel',
                action: closeDialog,
                type: 'secondary'
            },
            {
                label: 'Move to trash',
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
            hint={'Add to...'}
            icon={Icons.mdiPlus}
        />
        <IconButton
            hint={'Download'}
            onClick={download}
            external={true}
            icon={Icons.mdiTrayArrowDown}
        />
        <IconButton
            hint={'Delete'}
            onClick={openAskDeleteDialog}
            icon={Icons.mdiTrashCanOutline}
        />
    </div>
}

export default Brand
