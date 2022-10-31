import { useContext } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import { AlbumsQueryDocument, MediaQueryDocument,
    useDeleteMedia as useDeleteMediaMutation } from '@/types/api'

const useDeleteMedia = () => {
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)

    const [deleteMedia] = useDeleteMediaMutation({
        variables: {
            ids: Array.from(selection.selected.size ? selection.selected : [details?.medium]).map((item) => item?.id)
        },
        refetchQueries: [MediaQueryDocument, {
            query: AlbumsQueryDocument
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
