import { useContext } from 'react'
import { DetailsContext, DialogContext, SelectionContext, MediaContext } from '@/providers'
import { QAlbumsDocument, QMediaDocument, useMDeleteMedia } from '@/api'

const useDeleteMedia = () => {
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)
    const media = useContext(MediaContext)

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
