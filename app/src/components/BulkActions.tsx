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

    const dialog = useContext(DialogContext)

    const { state: [{ albums }] } = useAlbums()

    const selection = useContext(SelectionContext)

    const [addToAlbumMutation] = useAddToAlbum({
        variables: {
            idAlbum: `${activeAlbum}`,
            media: Array.from(selection.selected).map((s) => s.id)
        }
    })

    const [deleteMedia] = useDeleteMedia({
        variables: {
            ids: Array.from(selection.selected).map((item) => item.id)
        }
    })

    const { refetch } = useMedia()

    const openAskDeleteDialog = () => {
        dialog.open(`Remove ${selection.selected.size} from Picchu and all synced devices?`, [
            {
                label: t(ETrans.CANCEL),
                action: dialog.close,
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
                dialog.close()
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
        dialog.open('Add to Album', [], <>
            {albums.map((album, k) => <button
                key={k}
                onClick={() => addToAlbum(album.id)}
            >
                {album.id}
            </button>)}
        </>)
    }

    if (!selection.isInSelectionMode) {
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
