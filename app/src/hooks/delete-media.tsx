import { useContext } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import { QAlbumsDocument, QMediaDocument, useMDeleteMedia } from '@photon/shared'

const useDeleteMedia = () => {
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)

    const [deleteMedia] = useMDeleteMedia({
        variables: {
            ids: Array.from(selection.selected.size ? selection.selected : [details?.medium]).map((item) => item?.id)
        },
        refetchQueries: [QMediaDocument, {
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
