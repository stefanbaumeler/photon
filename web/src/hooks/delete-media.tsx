import { useDialogContext, useSelectionContext, useDetailsContext } from '@/providers'
import { useMDeleteMedia } from '@photon/schema'

const useDeleteMedia = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()

    const [, deleteMedia] = useMDeleteMedia()

    return () => {
        deleteMedia({
            ids: Array.from(selection.selected.size ? selection.selected : [details?.medium]).map((item) => item?.id)
        }).then(() => {
            dialog.close()
            details?.close()
        })
    }
}

export default useDeleteMedia
