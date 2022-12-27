import { useContext } from 'react'
import { DetailsContext, DialogContext, SelectionContext, MediaContext } from '@/providers'
import { QMediaDocument, useMEmptyTrash } from '@/api'
import { EMediumStatus } from '@/types/app'

const useEmptyTrash = () => {
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)
    const media = useContext(MediaContext)

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
