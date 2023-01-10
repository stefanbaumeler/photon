import { useDetailsContext, useDialogContext, useSelectionContext, useMediaContext } from '@/providers'
import { QMediaDocument, useMEmptyTrash } from '@photon/schema'
import { EMediumStatus } from '@/types/app'

const useEmptyTrash = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const media = useMediaContext()

    const [emptyTrash] = useMEmptyTrash({
        refetchQueries: [{
            query: QMediaDocument,
            variables: {
                status: EMediumStatus.TRASH,
                sort: media.sort
            }
        }]
    })

    return () => {
        emptyTrash().then(() => {
            selection.clear()
            dialog.close()
            details?.close()
        })
    }
}

export default useEmptyTrash
