import { useSelectionContext, useDetailsContext } from '@/providers'
import { useMDeleteMedia } from '@photon/schema'

export const useDeleteMedia = () => {
    const selection = useSelectionContext()
    const details = useDetailsContext()

    const [, deleteMedia] = useMDeleteMedia()

    return () => {
        deleteMedia({
            ids: selection.selected.size ? [...selection.selected] : [details?.medium.id]
        }).then(() => {
            details?.close()
        })
    }
}
