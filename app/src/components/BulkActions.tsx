import * as Icons from '@mdi/js'
import { IconButton } from '@/components/index'
import { useContext, useEffect, useState } from 'react'
import { DialogContext, SelectionContext } from '@/providers'
import { useAddToAlbum, useDeleteMedia } from '@/types/api'
import { useAlbums, useMedia } from '@/api/hooks'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ESelectionMode } from '@/types/app'

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
        dialog.open(t(ETrans.ADD_TO_THING, {
            thing: t(ETrans.ALBUM)
        }), [], <>
            {albums.map((album, k) => <button
                key={k}
                onClick={() => addToAlbum(album.id)}
            >
                {album.id}
            </button>)}
        </>)
    }

    if (selection.mode !== ESelectionMode.SELECT) {
        return <></>
    }

    return <div className="bulk-actions">
        <span className="bulk-actions__count">
            {t(ETrans.N_SELECTED, {
                n: selection.selected.size
            })}
        </span>
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
