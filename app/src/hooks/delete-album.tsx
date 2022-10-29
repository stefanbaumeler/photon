import { useContext } from 'react'
import { DialogContext } from '@/providers'
import { AlbumsQueryDocument,
    useDeleteAlbum as useDeleteAlbumMutation } from '@/types/api'
import { useRouter } from 'next/router'

const useDeleteAlbum = (id?: string) => {
    const dialog = useContext(DialogContext)
    const router = useRouter()

    const idToDelete = id ? id : Array.isArray(router.query.id) ? router.query.id.join('') : router.query.id

    const [deleteMedia] = useDeleteAlbumMutation({
        variables: {
            ids: [idToDelete]
        },
        refetchQueries: [{
            query: AlbumsQueryDocument
        }]
    })

    return () => {
        deleteMedia().then(() => {
            dialog.close()
            router.push('/albums')
        })
    }
}

export default useDeleteAlbum
