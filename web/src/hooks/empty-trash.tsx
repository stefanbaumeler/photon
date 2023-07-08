import { useDetailsContext, useDialogContext, useSelectionContext } from '@/providers'
import { useMEmptyTrash } from '@photon/schema'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const useEmptyTrash = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const instantSearch = useInstantSearch()

    const [emptyTrash] = useMEmptyTrash()

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
