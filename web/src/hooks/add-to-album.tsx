import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDialogContext, useSelectionContext } from '@/providers'
import { useMAddToAlbum } from '@photon/schema'

export const useAddToAlbum = () => {
    const router = useRouter()
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const [activeAlbum, setActiveAlbum] = useState<string | number>()

    const [, addToAlbumMutation] = useMAddToAlbum()

    useEffect(() => {
        if (activeAlbum) {
            addToAlbumMutation({
                idAlbum: `${activeAlbum}`,
                media: Array.from(selection.selected).map((s) => s.id)
            }).then(() => {
                router.push(`/albums/${activeAlbum}`).then(() => {
                    dialog.close()
                    selection.clear()
                    setActiveAlbum(undefined)
                })
            })
        }
    }, [addToAlbumMutation, dialog, router, selection, activeAlbum])

    return (id: string | number) => {
        setActiveAlbum(id)
    }
}
