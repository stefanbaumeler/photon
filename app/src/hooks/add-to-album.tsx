import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DialogContext, SelectionContext } from '@/providers'
import { QAlbumMediaDocument, useMAddToAlbum } from '@photon/shared'

const useAddToAlbum = () => {
    const router = useRouter()
    const dialog = useContext(DialogContext)
    const selection = useContext(SelectionContext)
    const [activeAlbum, setActiveAlbum] = useState<string | number>()

    const [addToAlbumMutation] = useMAddToAlbum({
        variables: {
            idAlbum: `${activeAlbum}`,
            media: Array.from(selection.selected).map((s) => s.id)
        },
        refetchQueries: [
            {
                query: QAlbumMediaDocument,
                variables: {
                    id: `${activeAlbum}`
                }
            }
        ]
    })

    useEffect(() => {
        if (activeAlbum) {
            addToAlbumMutation().then(() => {
                router.push(`/albums/${activeAlbum}`).then(() => {
                    dialog.close()
                    selection.clear()
                    setActiveAlbum(undefined)
                })
            })
        }
    }, [activeAlbum])

    return (id: string | number) => {
        setActiveAlbum(id)
    }
}

export default useAddToAlbum
