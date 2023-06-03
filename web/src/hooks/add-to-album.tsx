import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDialogContext, useSearchContext, useSelectionContext } from 'web/src/providers'
import { QAlbumMediaDocument, useMAddToAlbum } from '@photon/schema'

const useAddToAlbum = () => {
    const router = useRouter()
    const dialog = useDialogContext()
    const selection = useSelectionContext()
    const [activeAlbum, setActiveAlbum] = useState<string | number>()
    const search = useSearchContext()

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
                search.instantSearch.refresh()
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
