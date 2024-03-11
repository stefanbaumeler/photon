import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelectionContext } from '@/providers'
import { useMAddToAlbum } from '@photon/schema'

export const useAddToAlbum = () => {
    const router = useRouter()
    const selection = useSelectionContext()
    const [activeAlbum, setActiveAlbum] = useState<string | number>()

    const [, addToAlbumMutation] = useMAddToAlbum()

    useEffect(() => {
        if (activeAlbum) {
            addToAlbumMutation({
                id: `${activeAlbum}`,
                media: [...selection.selected]
            }).then(() => {
                router.push(`/albums/${activeAlbum}`).then(() => {
                    selection.clear()
                    setActiveAlbum(undefined)
                })
            })
        }
    }, [addToAlbumMutation, router, selection, activeAlbum])

    return (id: string | number) => {
        setActiveAlbum(id)
    }
}
