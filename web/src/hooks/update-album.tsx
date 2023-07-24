import { useSelectionContext } from '@/providers'
import { useMRemoveFromAlbum, useMUpdateAlbum } from '@photon/schema'

export const useUpdateAlbum = (id: string, title: string) => {
    const selection = useSelectionContext()

    const [, removeFromAlbum] = useMRemoveFromAlbum()

    const [, updateAlbumTitle] = useMUpdateAlbum()

    return () => {
        Promise.all([removeFromAlbum({
            idAlbum: `${id}`,
            media: [...selection.selected].map((s) => s.id)
        }), updateAlbumTitle({
            idAlbum: id,
            fields: {
                title
            }
        })]).then(() => {
            selection.clear()
        })
    }
}
