import { useDialogContext, useSelectionContext, useDetailsContext, useSearchContext } from 'web/src/providers'
import { QAlbumsDocument, useMDeleteMedia } from '@photon/schema'

const useDeleteMedia = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const search = useSearchContext()

    const [deleteMedia] = useMDeleteMedia({
        variables: {
            ids: Array.from(selection.selected.size ? selection.selected : [details?.medium]).map((item) => item?.id)
        },
        refetchQueries: [
            {
                query: QAlbumsDocument
            }
        ]
    })

    return () => {
        deleteMedia().then(() => {
            search.instantSearch.refresh()
            selection.clear()
            dialog.close()
            details?.close()
        })
    }
}

export default useDeleteMedia
