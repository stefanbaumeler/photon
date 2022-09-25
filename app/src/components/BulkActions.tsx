import * as Icons from '@mdi/js'
import { IconButton } from '@/components/index'
import { useContext, useEffect, useState } from 'react'
import { DialogContext, SelectionContext } from '@/providers'
import { useAddToAlbum, useDeleteMedia } from '@/types/api'
import { useAlbums, useMedia } from '@/api/hooks'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'

const BulkActions = () => {
    const { t } = useTranslation()

    const [activeAlbum, setActiveAlbum] = useState<string | number>()

    const {
        openDialog, closeDialog
    } = useContext(DialogContext)

    const { state: [{ albums }] } = useAlbums()

    const {
        selected, isInSelectionMode
    } = useContext(SelectionContext)

    const [addToAlbumMutation] = useAddToAlbum({
        variables: {
            idAlbum: `${activeAlbum}`,
            media: Array.from(selected).map((s) => s.id)
        }
    })

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

    useEffect(() => {
        if (activeAlbum) {
            addToAlbumMutation()
        }
    }, [activeAlbum])

    const addToAlbum = (id: string | number) => {
        setActiveAlbum(id)
    }

    const addTo = () => {
        openDialog('Add to Album', [], <>
            {albums.map((album) => <button onClick={() => addToAlbum(album.id)}>
                {album.id}
            </button>)}
        </>)
    }

    if (!isInSelectionMode) {
        return <></>
    }

    return <div className="bulk-actions">
        <IconButton
            hint={t(ETrans.ADD_TO)}
            icon={Icons.mdiPlus}
            onClick={addTo}
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
