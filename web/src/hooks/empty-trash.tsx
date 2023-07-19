import { useDetailsContext, useDialogContext, useSelectionContext } from '@/providers'
import { useMEmptyTrash } from '@photon/schema'

const useEmptyTrash = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()

    const [, emptyTrash] = useMEmptyTrash()

    return () => {
        emptyTrash({}).then(() => {
            selection.clear()
            dialog.close()
            details?.close()
        })
    }
}

export default useEmptyTrash
