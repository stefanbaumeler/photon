import { useSelectionContext } from '@/providers'
import { useMRemoveFromAlbum, useMUpdateAlbum } from '@photon/schema'

export const useUpdateAlbum = (id: string, title: string) => {
    const selection = useSelectionContext()

    const [, removeFromAlbum] = useMRemoveFromAlbum()

    const [, updateAlbumTitle] = useMUpdateAlbum()

    return () => {
        const promises = []

        if (selection.selected.size) {
            promises.push(removeFromAlbum({
                idAlbum: `${id}`,
                media: [...selection.selected].map((s) => s.id)
            }))
        }

        promises.push(updateAlbumTitle({
            id,
            title
        }))

        Promise.all(promises).then(() => {
            selection.clear()
        })
    }
}
