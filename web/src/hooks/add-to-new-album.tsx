import { useEffect, useState } from 'react'
import { useMCreateAlbum } from '@photon/schema'
import { useSelectionContext } from '@/providers'
import { useRouter } from 'next/router'

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
                router.push(`/albums/${result.data.createAlbum.id}`).then(() => {
                    selection.clear()
                })
            })
        }
    }, [createAlbumMutation, router, selection, newAlbum])

    return () => {
        setNewAlbum(true)
    }
}
