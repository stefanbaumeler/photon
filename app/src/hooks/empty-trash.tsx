import { useContext } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import { MediaQueryDocument,
    useEmptyTrash as useEmptyTrashMutation } from '@/types/api'
import { EMediumStatus } from '@/types/app'

const useEmptyTrash = () => {
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)

    const [emptyTrash] = useEmptyTrashMutation({
        refetchQueries: [{
            query: MediaQueryDocument,
            variables: {
                status: EMediumStatus.TRASH
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
