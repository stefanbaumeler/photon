import { useDetailsContext, useDialogContext, useSearchContext, useSelectionContext } from 'web/src/providers'
import { useMEmptyTrash } from '@photon/schema'

const useEmptyTrash = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const search = useSearchContext()

    const [emptyTrash] = useMEmptyTrash()

    return () => {
        emptyTrash().then(() => {
            search.instantSearch.refresh()
            selection.clear()
            dialog.close()
            details?.close()
        })
    }
}

export default useEmptyTrash
