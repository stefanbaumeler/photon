import { useEffect, useState } from 'react'
import { useMCreateAlbum } from '@photon/schema/dist/client'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useRouter } from 'next/navigation'

export const useAddToNewAlbum = () => {
    const router = useRouter()
    const [newAlbum, setNewAlbum] = useState(false)
    const selection = useSelectionContext()

    const [, createAlbumMutation] = useMCreateAlbum()

    useEffect(() => {
        if (newAlbum) {
            setNewAlbum(false)
            createAlbumMutation({
                media: Array.from(selection.selected)
            }).then((result) => {
                if (result.data) {
                    router.push(`/albums/${result.data.createAlbum.id}`)
                    selection.clear()
                }
            })
        }
    }, [createAlbumMutation, router, selection, newAlbum])

    return () => {
        setNewAlbum(true)
    }
}
