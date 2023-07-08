import { useDialogContext, useSelectionContext, useDetailsContext } from '@/providers'
import { QAlbumsDocument, useMDeleteMedia } from '@photon/schema'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const useDeleteMedia = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const instantSearch = useInstantSearch()

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
            instantSearch.refresh()
            selection.clear()
            dialog.close()
            details?.close()
        })
    }
}

export default useDeleteMedia
