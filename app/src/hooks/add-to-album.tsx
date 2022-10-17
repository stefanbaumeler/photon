import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DialogContext, SelectionContext } from '@/providers'
import { useAddToAlbum as useAddToAlbumMutation } from '@/types/api'
import { useAlbums, useMedia } from '@/api/hooks'
import { useAlbumMedia } from '@/api/hooks/albums'

const useAddToAlbum = () => {
    const router = useRouter()
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const media = useMedia()
    const albums = useAlbums()

    const [activeAlbum, setActiveAlbum] = useState<string | number>()

    const albumMedia = useAlbumMedia({
        id: `${activeAlbum}`
    })

    const [addToAlbumMutation] = useAddToAlbumMutation({
        variables: {
            idAlbum: `${activeAlbum}`,
            media: Array.from(selection.selected).map((s) => s.id)
        }
    })

    useEffect(() => {
        if (activeAlbum) {
            console.log('exists', addToAlbumMutation)
            addToAlbumMutation().then(() => {
                console.log('wat')
                Promise.all([media.refetch(), albums.refetch(), albumMedia.refetch()]).then(() => {
                    console.log(albums)
                    router.push(`/albums/${activeAlbum}`).then(() => {
                        dialog.close()
                        selection.clear()
                        setActiveAlbum(undefined)
                    })
                })
            }).catch((c) => {
                console.log('catch')
                console.log(c)
            })
        }
    }, [activeAlbum])

    return (id: string | number) => {
        setActiveAlbum(id)
    }
}

export default useAddToAlbum
