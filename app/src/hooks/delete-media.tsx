import { useDialogContext, useSelectionContext, useMediaContext, useDetailsContext } from '../providers'
import { QAlbumsDocument, QMediaDocument, useMDeleteMedia } from '../api'

const useDeleteMedia = () => {
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()
    const media = useMediaContext()

    const [deleteMedia] = useMDeleteMedia({
        variables: {
            ids: Array.from(selection.selected.size ? selection.selected : [details?.medium]).map((item) => item?.id)
        },
        refetchQueries: [{
            query: QMediaDocument,
            variables: {
                sort: media.sort,
                status: media.status
            }
        }, {
            query: QAlbumsDocument
        }]
    })

    return () => {
        deleteMedia().then(() => {
            selection.clear()
            dialog.close()
            details?.close()
        })
    }
}

export default useDeleteMedia
