import { useDialogContext, useSelectionContext, useDetailsContext } from '@/providers'
import { useMDeleteMedia } from '@photon/schema'

export const useDeleteMedia = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()

    const [, deleteMedia] = useMDeleteMedia()

    return () => {
        deleteMedia({
            ids: selection.selected.size ? [...selection.selected] : [details?.medium.id]
        }).then(() => {
            dialog.close()
            details?.close()
        })
    }
}
