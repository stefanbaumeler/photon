import { useContext, useEffect, useState } from 'react'
import { useCreateAlbum } from '@/types/api'
import { DialogContext, SelectionContext } from '@/providers'
import { useRouter } from 'next/router'
import { useAlbums } from '@/api/hooks'

const useAddToNewAlbum = () => {
    const router = useRouter()
    const [newAlbum, setNewAlbum] = useState(false)
    const selection = useContext(SelectionContext)
    const dialog = useContext(DialogContext)
    const albums = useAlbums()

    const [createAlbumMutation] = useCreateAlbum({
        variables: {
            media: Array.from(selection.selected).map((s) => s.id)
        }
    })

    useEffect(() => {
        if (newAlbum) {
            setNewAlbum(false)
            createAlbumMutation().then((result) => {
                albums.refetch().then(() => {
                    router.push(`/albums/${result.data.createAlbum}`).then(() => {
                        dialog.close()
                        selection.clear()
                    })
                })
            })
        }
    }, [newAlbum])

    return () => {
        setNewAlbum(true)
    }
}

export default useAddToNewAlbum
