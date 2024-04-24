import { useMRemoveFromAlbum, useMUpdateAlbum } from '@photon/schema/dist/client'
import { useSelectionContext } from '@/providers/SelectionProvider'

export const useUpdateAlbum = (title: string, id?: string) => {
    const selection = useSelectionContext()

    const [, removeFromAlbum] = useMRemoveFromAlbum()
    const [, updateAlbumTitle] = useMUpdateAlbum()

    return () => {
        if (!id) {
            return
        }

        const promises = []

        if (selection.selected.size) {
            promises.push(removeFromAlbum({
                idAlbum: `${id}`,
                media: [...selection.selected]
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
