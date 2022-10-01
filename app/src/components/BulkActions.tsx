import * as Icons from '@mdi/js'
import { IconButton, Thumbnails } from '@/components'
import { useContext, useEffect, useState } from 'react'
import { DialogContext, SelectionContext } from '@/providers'
import { useAddToAlbum, useCreateAlbum, useDeleteMedia } from '@/types/api'
import { useAlbums, useMedia } from '@/api/hooks'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ESelectionMode, EThumbnailType, TThumbnail } from '@/types/app'
import { useRouter } from 'next/router'

const BulkActions = () => {
    const router = useRouter()

    const { t } = useTranslation()

    const [activeAlbum, setActiveAlbum] = useState<string | number>()
    const [newAlbum, setNewAlbum] = useState(false)

    const dialog = useContext(DialogContext)

    const albums = useAlbums()

    const selection = useContext(SelectionContext)

    const [addToAlbumMutation] = useAddToAlbum({
        variables: {
            idAlbum: `${activeAlbum}`,
            media: Array.from(selection.selected).map((s) => s.id)
        }
    })

    const [createAlbumMutation] = useCreateAlbum({
        variables: {
            media: Array.from(selection.selected).map((s) => s.id)
        }
    })

    const addToAlbum = (id: string | number) => {
        setActiveAlbum(id)
    }

    const addToNewAlbum = () => {
        setNewAlbum(true)
    }

    const albumThumbnails = albums.state.map<TThumbnail>((album) => ({
        type: EThumbnailType.DEFAULT,
        title: album.title,
        idMedium: album.idMedium,
        onClick: () => addToAlbum(album.id)
    }))

    albumThumbnails.unshift({
        type: EThumbnailType.ADD,
        title: t(ETrans.NEW_ALBUM),
        onClick: addToNewAlbum
    })

    const [deleteMedia] = useDeleteMedia({
        variables: {
            ids: Array.from(selection.selected).map((item) => item.id)
        }
    })

    const { refetch } = useMedia()

    const openAskDeleteDialog = () => {
        dialog.open({
            title: t(ETrans.MOVE_TO_TRASH),
            text: t(ETrans.MOVE_ITEMS_TO_TRASH, {
                count: selection.selected.size,
                thing: t(ETrans.ELEMENT, {
                    count: selection.selected.size
                })
            }),
            buttons: [
                {
                    label: t(ETrans.CANCEL),
                    action: dialog.close,
                    type: 'secondary'
                },
                {
                    label: t(ETrans.MOVE_TO_TRASH),
                    action: confirmDeleteMedia
                }
            ]
        })
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
            setActiveAlbum(undefined)
            addToAlbumMutation().then((result) => {
                router.push(`/albums/${activeAlbum}`)
                dialog.close()
                selection.clear()
            })
        }
    }, [activeAlbum])

    useEffect(() => {
        if (newAlbum) {
            setNewAlbum(false)
            createAlbumMutation().then((result) => {
                router.push(`/albums/${result.data.createAlbum}`)
                dialog.close()
                selection.clear()
            })
        }
    }, [newAlbum])

    const addTo = () => {
        dialog.open({
            title: t(ETrans.ADD_TO),
            buttons: [
                {
                    label: t(ETrans.CANCEL),
                    action: dialog.close,
                    type: 'secondary'
                }
            ],
            content: <Thumbnails thumbnails={albumThumbnails} />
        })
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
