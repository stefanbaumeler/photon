import { useContext, useEffect, useState } from 'react'
import { AlbumsQueryDocument, useCreateAlbum } from '@/types/api'
import { DialogContext, SelectionContext } from '@/providers'
import { useRouter } from 'next/router'

const useAddToNewAlbum = () => {
    const router = useRouter()
    const [newAlbum, setNewAlbum] = useState(false)
    const selection = useContext(SelectionContext)
    const dialog = useContext(DialogContext)

    const [createAlbumMutation] = useCreateAlbum({
        variables: {
            media: Array.from(selection.selected).map((s) => s.id)
        },
        refetchQueries: [AlbumsQueryDocument]
    })

    useEffect(() => {
        if (newAlbum) {
            setNewAlbum(false)
            createAlbumMutation().then((result) => {
                router.push(`/albums/${result.data.createAlbum}`).then(() => {
                    dialog.close()
                    selection.clear()
                })
            })
        }
    }, [newAlbum])

    return () => {
        setNewAlbum(true)
    }
}

export default useAddToNewAlbum
