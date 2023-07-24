import { useEffect, useState } from 'react'
import { useMCreateAlbum } from '@photon/schema'
import { useDialogContext, useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'

export const useAddToNewAlbum = () => {
    const router = useRouter()
    const [newAlbum, setNewAlbum] = useState(false)
    const selection = useSelectionContext()
    const dialog = useDialogContext()

    const [, createAlbumMutation] = useMCreateAlbum()

    useEffect(() => {
        if (newAlbum) {
            setNewAlbum(false)
            createAlbumMutation({
                media: Array.from(selection.selected).map((s) => s.id)
            }).then((result) => {
                router.push(`/albums/${result.data.createAlbum.id}`).then(() => {
                    dialog.close()
                    selection.clear()
                })
            })
        }
    }, [createAlbumMutation, dialog, router, selection, newAlbum])

    return () => {
        setNewAlbum(true)
    }
}
