import { QFavoritesDocument, QMediaDocument, useMAddToFavorites } from '@/api'
import { useContext } from 'react'
import { SelectionContext, MediaContext } from '@/providers'

const useAddToFavorites = (mediaIds: string[]) => {
    const selection = useContext(SelectionContext)
    const media = useContext(MediaContext)

    const [addToFavorites] = useMAddToFavorites({
        variables: {
            media: mediaIds
        },
        refetchQueries: [{
            query: QMediaDocument,
            variables: {
                sort: media.sort
            }
        }, QFavoritesDocument]
    })

    return () => {
        addToFavorites().then(() => {
            selection.clear()
        })
    }
}

export default useAddToFavorites
