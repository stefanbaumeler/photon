import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { useMAddToAlbum } from '@photon/schema/dist/client'

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
                router.push(`/albums/${activeAlbum}`)
                selection.clear()
                setActiveAlbum(undefined)
            })
        }
    }, [addToAlbumMutation, router, selection, activeAlbum])

    return (id: string | number) => {
        setActiveAlbum(id)
    }
}
