import { useDetailsContext, useDialogContext, useSelectionContext, useMediaContext } from '@/providers'
import { QMediaDocument, useMEmptyTrash } from '@photon/schema'
import { EMediumStatus } from '@/types/app'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const useEmptyTrash = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const media = useMediaContext()
    const instantSearch = useInstantSearch()

    const [emptyTrash] = useMEmptyTrash({
        refetchQueries: [
            {
                query: QMediaDocument,
                variables: {
                    status: EMediumStatus.TRASH,
                    sort: media.sort
                }
            }
        ]
    })

    return () => {
        emptyTrash().then(() => {
            instantSearch.refresh()
            selection.clear()
            dialog.close()
            details?.close()
        })
    }
}

export default useEmptyTrash
