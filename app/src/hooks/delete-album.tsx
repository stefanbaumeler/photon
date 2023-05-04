import { useDialogContext, useSelectionContext } from '@/providers'
import { QAlbumsDocument, useMDeleteAlbum } from '@photon/schema'
import { useRouter } from 'next/router'
import { asArray } from '@/util/as'

const useDeleteAlbum = (id?: string | string[]) => {
    const dialog = useDialogContext()
    const router = useRouter()
    const selection = useSelectionContext()
    const idsToDelete = id ? asArray(id) : router.query.id

    const [deleteMedia] = useMDeleteAlbum({
        variables: {
            ids: idsToDelete
        },
        refetchQueries: [
            {
                query: QAlbumsDocument
            }
        ]
    })

    return () => {
        deleteMedia().then(() => {
            selection.clear()
            dialog.close()
            router.push('/albums')
        })
    }
}

export default useDeleteAlbum
